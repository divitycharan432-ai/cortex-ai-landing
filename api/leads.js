import { createSign } from 'node:crypto'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

async function getServiceAccountToken() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !privateKey) throw new Error('Google Sheets credentials are not configured')

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(JSON.stringify({ iss: email, scope: SHEETS_SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }))
  const unsignedToken = header + '.' + claims
  const signer = createSign('RSA-SHA256')
  signer.update(unsignedToken)
  signer.end()
  const assertion = unsignedToken + '.' + signer.sign(privateKey).toString('base64url')

  return fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'Invalid request.' })
  if (body.website) return res.status(200).json({ ok: true })

  const name = clean(body.name, 120)
  const company = clean(body.company, 160)
  const phone = clean(body.phone, 32)
  const bottleneck = clean(body.bottleneck, 160)
  if (!name || !company || !phone || !bottleneck || !/^[0-9+()\s-]{8,32}$/.test(phone)) {
    return res.status(400).json({ error: 'Please check the required fields.' })
  }

  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) return res.status(503).json({ error: 'Lead storage is not configured.' })

  try {
    const tokenResponse = await getServiceAccountToken()
    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok || !tokenData.access_token) throw new Error('Google authentication failed')

    const range = encodeURIComponent('Leads!A:E')
    const appendUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + encodeURIComponent(sheetId) + '/values/' + range + ':append?valueInputOption=RAW&insertDataOption=INSERT_ROWS'
    const appendResponse = await fetch(appendUrl, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tokenData.access_token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [[new Date().toISOString(), name, company, phone, bottleneck]] }),
    })

    if (!appendResponse.ok) throw new Error('Google Sheets rejected the row')
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Could not save your enquiry. Please try again.' })
  }
}
