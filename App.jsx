import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock3, FileText, GitBranch, MessageCircle, Sparkles, Workflow } from 'lucide-react'

const services = [
  {
    number: '01', icon: MessageCircle, title: 'Instant WhatsApp\nlead follow-ups',
    copy: 'A quick, thoughtful response for every enquiry, even when your team is busy.',
    tag: 'NEVER MISS A LEAD',
  },
  {
    number: '02', icon: GitBranch, title: 'CRM & pipeline\nsync',
    copy: 'Keep contacts, conversations and next steps moving together, automatically.',
    tag: 'LESS ADMIN, MORE MOMENTUM',
  },
  {
    number: '03', icon: FileText, title: 'Documents &\ninvoices',
    copy: 'Turn repetitive data entry and document sorting into a smoother workflow.',
    tag: 'WORK THAT FLOWS',
  },
]

function Logo() {
  return <a href="#home" className="brand" aria-label="Cortex AI home"><span className="brand-mark"><Sparkles size={18} strokeWidth={2.2} /></span><span>Cortex<span className="brand-ai"> AI</span></span></a>
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return

    const values = new FormData(event.currentTarget)
    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'),
          company: values.get('company'),
          phone: values.get('phone'),
          bottleneck: values.get('bottleneck'),
          website: values.get('website'),
        }),
      })

      if (!response.ok) throw new Error('Lead submission failed')
      setSubmitted(true)
    } catch {
      setSubmitError('We couldn’t save your enquiry. Please try again shortly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div id="home" className="min-h-screen overflow-hidden">
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <Logo />
          <a className="nav-cta" href="#contact">Book Discovery Call <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AI AUTOMATION, BUILT AROUND YOUR BUSINESS</div>
            <h1>Automate Your<br />Business <span className="serif-word">Bottlenecks</span><br />with AI.</h1>
            <p className="hero-sub">We help businesses across India eliminate manual tasks like missed leads and messy follow-ups through custom automation.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Request a free audit <ArrowRight size={17} /></a>
              <a className="text-link" href="#how-it-works"><span className="play-icon"><ArrowDown size={15} /></span> See how it works</a>
            </div>
            <div className="hero-note"><div className="note-icon"><Clock3 size={17} /></div><span><b>Built for busy teams.</b><br />Practical automations, no extra complexity.</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a connected AI workflow">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-label label-top"><span className="label-dot green" /> LEAD RECEIVED <span>09:41</span></div>
            <div className="flow-line line-a" /><div className="flow-line line-b" /><div className="flow-line line-c" />
            <div className="node node-chat"><MessageCircle size={20} /></div>
            <div className="node node-crm"><Workflow size={20} /></div>
            <div className="node node-doc"><FileText size={20} /></div>
            <div className="core-glow"><div className="core"><Sparkles size={31} strokeWidth={1.5} /></div></div>
            <div className="art-card card-follow"><div className="mini-icon"><MessageCircle size={15} /></div><span><b>Follow-up sent</b><small>WhatsApp · just now</small></span><CheckCircle2 className="card-check" size={17} /></div>
            <div className="art-card card-pipeline"><span className="pipeline-bars"><i /><i /><i /><i /></span><span><b>Pipeline synced</b><small>Everything in its place</small></span></div>
            <div className="art-label label-bottom"><span className="label-dot purple" /> YOUR WORKFLOW, IN MOTION</div>
          </div>
          <div className="hero-bottom"><span>LESS BUSYWORK. MORE BUSINESS.</span><span className="scroll-mark">SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
        </section>

        <section className="trust-strip"><div className="trust-inner"><span>MADE FOR THE WAY YOU WORK</span><div className="trust-divider" /><p>Built for businesses <b>·</b> Across India</p><div className="trust-stars">✳ &nbsp;✳ &nbsp;✳</div></div></section>

        <section id="how-it-works" className="section-wrap process-section">
          <div className="section-heading"><div><div className="eyebrow eyebrow-muted">A CLEARER WAY FORWARD</div><h2>Simple by design.<br /><span className="serif-word">Thoughtful by default.</span></h2></div><p>Good automation starts with understanding your work. We keep the process human, practical, and easy to follow.</p></div>
          <div className="steps-grid">
            <article className="step-card"><div className="step-top"><span className="step-number">01</span><span className="step-icon"><MessageCircle size={19} /></span></div><div className="step-meta">FIRST, WE LISTEN</div><h3>Requirement<br />discovery</h3><p>We learn how your team works, find the manual bottlenecks, and map a clear automation blueprint.</p><span className="step-bottom">YOUR BUSINESS, UNDERSTOOD <ArrowRight size={15} /></span></article>
            <div className="step-connector"><span><ArrowRight size={17} /></span></div>
            <article className="step-card step-card-accent"><div className="step-top"><span className="step-number">02</span><span className="step-icon"><Sparkles size={19} /></span></div><div className="step-meta">THEN, WE MAKE IT HAPPEN</div><h3>Expert<br />fulfillment</h3><p>We match your project with vetted technology partners to build, connect, and deploy it seamlessly.</p><span className="step-bottom">A BETTER WAY TO GET IT DONE <ArrowRight size={15} /></span></article>
          </div>
          <div className="process-footnote"><Check size={15} /> You stay in control at every step.</div>
        </section>

        <section id="services" className="services-section">
          <div className="section-wrap services-wrap">
            <div className="section-heading services-heading"><div><div className="eyebrow eyebrow-muted">SMALL FIXES. BIG DIFFERENCE.</div><h2>Work that moves<br /><span className="serif-word">without the busywork.</span></h2></div><p>Start with one friction point. We’ll help you find an automation that makes the day a little easier.</p></div>
            <div className="services-grid">{services.map(({ number, icon: Icon, title, copy, tag }) => <article className="service-card" key={number}><div className="service-card-top"><span className="service-icon"><Icon size={20} strokeWidth={1.8} /></span><span className="service-number">{number}</span></div><h3>{title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3><p>{copy}</p><div className="service-card-foot"><span>{tag}</span><ArrowUpRight size={16} /></div></article>)}</div>
          </div>
        </section>

        <section id="contact" className="contact-section section-wrap">
          <div className="contact-panel">
            <div className="contact-copy"><div className="eyebrow contact-eyebrow"><span className="status-dot" /> YOUR NEXT STEP</div><h2>Let’s find your<br /><span className="serif-word">easier.</span></h2><p>Tell us what’s slowing your team down. We’ll take a look and share a few ideas—no pressure, just a useful conversation.</p><div className="contact-promise"><span><Check size={14} /></span> Free 20-minute workflow audit</div><div className="contact-promise"><span><Check size={14} /></span> A real person gets back to you</div><div className="contact-orb"><Sparkles size={22} /></div></div>
            <div className="form-wrap">{submitted ? <div className="success-state" role="status"><span className="success-icon"><Check size={27} /></span><div className="eyebrow eyebrow-muted">MESSAGE RECEIVED</div><h3>Thanks! We will reach out via WhatsApp shortly.</h3><p>We’re looking forward to learning how your team works.</p><button className="reset-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowRight size={15} /></button></div> : <form onSubmit={handleSubmit}>
              <div className="form-heading"><span>START A CONVERSATION</span><small>* Required fields</small></div>
              <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex="-1" autoComplete="off" /></label></div>
              <label>Full name <em>*</em><input name="name" type="text" placeholder="e.g. Priya Sharma" autoComplete="name" required /></label>
              <label>Company name <em>*</em><input name="company" type="text" placeholder="Where do you work?" autoComplete="organization" required /></label>
              <label>WhatsApp number <em>*</em><div className="phone-input"><span>+91 <ChevronDown size={13} /></span><input name="phone" type="tel" placeholder="98765 43210" autoComplete="tel" pattern="[0-9+()\s-]{8,16}" title="Enter a valid phone number" required /></div></label>
              <label>What’s your primary bottleneck? <em>*</em><select name="bottleneck" defaultValue="" required><option value="" disabled>Choose what takes up your time</option><option>Missed or slow lead follow-ups</option><option>Manual CRM and pipeline updates</option><option>Document or invoice processing</option><option>Scheduling and follow-up coordination</option><option>Something else</option></select></label>
              <button className="button button-dark submit-button" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Request my free audit'} <ArrowRight size={17} /></button>
              {submitError && <p className="form-error" role="alert">{submitError}</p>}
              <p className="form-privacy">Your details stay private. No spam, ever.</p>
            </form>}</div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="footer-inner"><Logo /><p>Thoughtful automation for teams on the move.</p><div className="footer-right"><span>© 2026 Cortex AI</span><a href="#contact">Contact <ArrowUpRight size={13} /></a><span className="footer-privacy">Your details are always kept private.</span></div></div></footer>
    </div>
  )
}

export default App
