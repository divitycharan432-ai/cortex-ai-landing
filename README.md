# Cortex AI

A lightweight, responsive landing page for an AI automation service serving businesses across India.

## Run locally

```bash
npm install
npm run dev
```

For a production build, run `npm run build`. The output is written to `dist/`.

## Save enquiries to Google Sheets

The contact form sends submissions to the Vercel serverless function at `/api/leads`. The server appends each enquiry to a Google Sheet before showing the success message. Google credentials are read only on the server.

### 1. Create the sheet

Create a Google spreadsheet and add a tab named exactly `Leads`. Add these headers in row 1:

```text
Timestamp | Full Name | Company | WhatsApp | Primary Bottleneck
```

### 2. Give the service account access

In Google Cloud, enable the Google Sheets API and create a service account. Copy its client email and private key from its JSON key. Share the spreadsheet with the service account email and give it Editor access. Keep the spreadsheet private.

### 3. Configure Vercel

In the Vercel project, open **Settings → Environment Variables** and add these variables for Production (and Preview if needed):

- `GOOGLE_SHEET_ID`: the spreadsheet ID from its URL (the part between `/d/` and `/edit`).
- `GOOGLE_SHEETS_CLIENT_EMAIL`: the service account client email.
- `GOOGLE_SHEETS_PRIVATE_KEY`: the entire private key value from the service account JSON, including the BEGIN/END lines. If Vercel stores escaped newlines, the function converts them.

Save the variables and redeploy the project. Do not put these values in frontend code, use a `VITE_` prefix, commit them to GitHub, or share the private key in chat.

## Troubleshooting

- The sheet tab name must be `Leads` and the service account must have Editor access.
- Form submissions will show an error until all three Vercel variables are set and a deployment has completed.
- For local testing, put the same variables in a local `.env.local` file (never commit it) and run the Vercel development server with the project’s Vercel CLI setup.
