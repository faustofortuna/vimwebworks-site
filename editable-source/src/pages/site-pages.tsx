import { ArrowRight, ArrowUpRight, RotateCcw } from 'lucide-react';
import { type FormEvent, useMemo, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { siteData, type Package } from '@/data/site-data';
import { PageHero, PrincipleList, ProjectCanvas, SectionMarker, WorkItem } from '@/components/site-components';

function CtaLink({ children = 'Request a Website Consultation' }: { children?: string }) {
  return <Link href="/consultation" className="button-vim button-primary" data-testid="link-consultation-cta">{children} <ArrowUpRight size={16} aria-hidden="true" /></Link>;
}

function OverviewSection() {
  return (
    <section className="overview" aria-labelledby="overview-heading">
      <div className="container-vim overview-grid">
        <div>
          <SectionMarker number="01" label="The short version" />
          <h2 className="section-title" id="overview-heading">{siteData.overview.heading}</h2>
        </div>
        <div>
          <div className="overview-list">
            {siteData.overview.rows.map((row, index) => <div className="overview-row" key={row}><span className="row-num">0{index + 1}</span><span>{row}</span></div>)}
          </div>
          <p className="support-line" style={{ marginTop: 24 }}>{siteData.overview.note}</p>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="transition-section" aria-labelledby="social-heading">
      <div className="container-vim transition-grid">
        <div>
          <SectionMarker number="02" label="From social to standalone" />
          <h2 className="section-title" id="social-heading">{siteData.social.heading}</h2>
          <div className="platform-strip" aria-label="Social platforms">
            <span>Facebook</span><span>Instagram</span><span>X/Twitter</span><span>other places</span>
          </div>
        </div>
        <p className="transition-copy">{siteData.social.body}</p>
      </div>
    </section>
  );
}

function WorkSection({ preview = false }: { preview?: boolean }) {
  return (
    <section className={`work-section ${preview ? '' : 'page-work'}`} aria-labelledby="work-heading">
      <div className="container-vim">
        <div className="section-intro">
          <div>
            <SectionMarker number="03" label="Sample work" />
          <h2 className="section-title" id="work-heading">Three directions. Same clarity.</h2>
          </div>
          {preview && <Link href="/work" className="text-link" data-testid="link-view-all-work">View all sample work <ArrowRight size={15} aria-hidden="true" /></Link>}
          {!preview && <p>These are fictional concept projects, built to show the kind of thinking and composition VIM Webworks brings to a service business.</p>}
        </div>
        <div className="work-stack">
          {siteData.projects.map((project, index) => <WorkItem project={project} index={index} key={project.name} />)}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="pricing-section" aria-labelledby="pricing-heading">
      <div className="container-vim">
        <div className="section-intro">
          <div>
            <SectionMarker number="04" label="Services & pricing" />
          <h2 className="section-title" id="pricing-heading">Clear enough to choose.</h2>
          </div>
          {compact && <Link href="/services" className="text-link" data-testid="link-view-services">See full inclusions <ArrowRight size={15} aria-hidden="true" /></Link>}
        </div>
        <div className="price-table">
          {siteData.packages.map((pack, index) => <PriceRow packageItem={pack} index={index} key={pack.name} compact={compact} />)}
        </div>
        {!compact && <PricingFinePrint />}
      </div>
    </section>
  );
}

function PriceRow({ packageItem, index, compact }: { packageItem: Package; index: number; compact: boolean }) {
  const [expanded, setExpanded] = useState(!compact || index === 0);
  return (
    <article className="price-row" data-testid={`row-package-${packageItem.name.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="price-meta">
        <div className="price-name">{packageItem.name}</div>
        {packageItem.best && <div className="price-best">{packageItem.best}</div>}
      </div>
      <div>
        <div className="price-amount">{packageItem.price}</div>
        <p className="price-description">{packageItem.description}</p>
      </div>
      <div>
        {compact && (
          <button className="text-link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }} onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} data-testid={`button-toggle-${packageItem.name.toLowerCase().replaceAll(' ', '-')}`}>
            {expanded ? 'Hide inclusions' : 'Show inclusions'}
          </button>
        )}
        {expanded && <ul className="price-details">{packageItem.inclusions.map((item) => <li key={item}>{item}</li>)}</ul>}
        {packageItem.timing && <p className="price-note">{packageItem.timing}</p>}
        {packageItem.note && <p className="price-note">{packageItem.note}</p>}
      </div>
    </article>
  );
}

function PricingFinePrint() {
  return (
    <div className="excluded">
      <h3>Excluded unless quoted separately</h3>
      <ul className="excluded-list">{siteData.exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="price-note">Fixed add-on prices are not published. Third-party charges are not included unless a written order states otherwise.</p>
    </div>
  );
}

function ProcessSection({ preview = false }: { preview?: boolean }) {
  return (
    <section className="process-section" aria-labelledby="process-heading">
      <div className="container-vim">
        <div className="process-intro">
          <div>
            <SectionMarker number="05" label="The workbench" />
          <h2 className="section-title" id="process-heading">Seven steps. No fog.</h2>
          </div>
          {preview && <Link href="/process" className="text-link" style={{ color: 'var(--utility)' }} data-testid="link-view-process">Read the full process <ArrowRight size={15} aria-hidden="true" /></Link>}
          {!preview && <p className="support-line">A guided route from first note to an approved, ready-to-use website.</p>}
        </div>
        <div className="timeline">
          {siteData.process.map(([title, body], index) => (
            <div className="step" key={title}>
              <span className="step-number">0{index + 1}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ preview = false }: { preview?: boolean }) {
  return (
    <section className="about-section" aria-labelledby="about-heading">
      <div className="container-vim about-grid">
        <div className="about-copy">
          <SectionMarker number="06" label="About VIM Webworks" />
        <h2 className="section-title" id="about-heading">{siteData.about.heading}</h2>
        <p style={{ marginTop: 28 }}>{siteData.about.body}</p>
          {!preview && <a className="text-link" href={`mailto:${siteData.email}`} data-testid="link-about-email">Talk with VIM Webworks <ArrowUpRight size={15} aria-hidden="true" /></a>}
        </div>
        <div>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Operating principles</p>
          <PrincipleList items={siteData.principles} />
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust-section" aria-labelledby="trust-heading">
      <div className="container-vim trust-grid">
        <div>
          <SectionMarker number="07" label="Trust, made visible" />
        <h2 className="section-title" id="trust-heading">What you can expect.</h2>
        </div>
        <div className="trust-list">
          {siteData.trust.map((item, index) => <div className="trust-item" key={item}><span>0{index + 1}</span>{item}</div>)}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="closing" aria-labelledby="closing-heading">
      <div className="container-vim">
      <p className="eyebrow">Ready when the direction is clear</p>
      <h2 id="closing-heading">{siteData.closing}</h2>
        <CtaLink />
      </div>
    </section>
  );
}

function HeroSection() {
  const headline = siteData.hero.headline;
  const [typedHeadline, setTypedHeadline] = useState('');

  useEffect(() => {
    setTypedHeadline('');
    let characterIndex = 0;
    const interval = window.setInterval(() => {
      characterIndex += 1;
      setTypedHeadline(headline.slice(0, characterIndex));
      if (characterIndex >= headline.length) {
        window.clearInterval(interval);
      }
    }, 38);

    return () => window.clearInterval(interval);
  }, [headline]);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container-vim hero-grid">
        <div className="hero-copy">
          <p className="eyebrow reveal">{siteData.hero.eyebrow}</p>
          <h1 className="reveal reveal-delay-1" id="hero-heading" aria-label={headline}>{typedHeadline}</h1>
          <p className="hero-intro reveal reveal-delay-2">{siteData.hero.supporting}</p>
          <div className="hero-actions reveal reveal-delay-3">
            <CtaLink />
            <Link href="/services" className="text-link" data-testid="link-hero-services">Explore services and pricing <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="hero-project reveal reveal-delay-2">
          <ProjectCanvas project={siteData.projects[0]} />
          <div className="project-caption"><span>Northline Home Services</span><span>Sample project / concept work</span></div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const sections = ['hero', 'overview', 'social', 'work', 'pricing', 'process', 'about', 'trust', 'closing'];

  const renderSection = (id: string) => {
    switch (id) {
      case 'hero': return <HeroSection key="hero" />;
      case 'overview': return <OverviewSection key="overview" />;
      case 'social': return <SocialSection key="social" />;
      case 'work': return <WorkSection preview key="work" />;
      case 'pricing': return <PricingSection compact key="pricing" />;
      case 'process': return <ProcessSection preview key="process" />;
      case 'about': return <AboutSection preview key="about" />;
      case 'trust': return <TrustSection key="trust" />;
      case 'closing': return <ClosingSection key="closing" />;
      default: return null;
    }
  };

  return (
    <main id="main-content">
      {sections.map(renderSection)}
    </main>
  );
}

export function WorkPage() {
  type WorkFilter = 'All' | 'Home Services' | 'Restaurant & Retail' | 'Professional Services';
  const [filter, setFilter] = useState<WorkFilter>('All');
  const projects = useMemo(() => filter === 'All' ? siteData.projects : siteData.projects.filter((project) => project.industry === filter), [filter]);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('vim-work-scroll-position');
    if (!savedPosition) return;
    sessionStorage.removeItem('vim-work-scroll-position');
    window.requestAnimationFrame(() => window.scrollTo({ top: Number(savedPosition), behavior: 'auto' }));
  }, []);

  return (
    <main id="main-content" className="page-work">
      <PageHero eyebrow="Sample work / concept directions" title={<>Work with a<br /><span className="signature">point of view.</span></>} description="Three fictional sample websites show how clear information and distinct visual direction can live together. They are concepts, not customer work, reviews, results, or live submissions." />
      <section className="work-gallery" aria-labelledby="gallery-heading">
        <div className="container-vim">
          <div className="gallery-intro">
            <div>
              <p className="eyebrow">03 / Enter the work</p>
              <h2 className="section-title" id="gallery-heading">Read the site, not just the thumbnail.</h2>
            </div>
            <p>Each sample opens as a complete, responsive fictional website. Use the internal navigation, then return here when you are ready to talk about your own.</p>
          </div>
          <div className="gallery-filters" role="group" aria-label="Filter sample work">
            {(['All', 'Home Services', 'Restaurant & Retail', 'Professional Services'] as const).map((option) => (
              <button key={option} type="button" className={filter === option ? 'gallery-filter is-active' : 'gallery-filter'} onClick={() => setFilter(option)} aria-pressed={filter === option} data-testid={`button-filter-${option.toLowerCase().replaceAll(' ', '-')}`}>
                {option}
              </button>
            ))}
          </div>
          <div className="work-stack">
            {projects.map((project, index) => <WorkItem project={project} index={index} key={project.name} />)}
          </div>
          <p className="concept-disclosure">All three websites are fictional concepts by VIM Webworks. No business shown here is a customer, and no copy, review, result, or interaction should be read as a claim.</p>
        </div>
      </section>
    </main>
  );
}

export function ServicesPage() {
  return <main id="main-content" className="services-page"><PageHero eyebrow="Services & pricing" title={<>Choose the<br />right starting<br /><span className="signature">shape.</span></>} description="Public prices, clear inclusions, and honest boundaries. Start with the level of website your business actually needs." /><PricingSection /></main>;
}

export function ProcessPage() {
  return <main id="main-content" className="process-page"><PageHero eyebrow="Process / seven steps" title={<>A clear route<br />from note to<br /><span className="signature">launch.</span></>} description="The process keeps decisions, responsibilities, revision rounds, and approval visible at every turn." /><ProcessSection /></main>;
}

export function AboutPage() {
  return <main id="main-content" className="about-page"><PageHero eyebrow="About VIM Webworks" title={<>Good websites<br />start with<br /><span className="signature">respect.</span></>} description="Respect for the owner’s time, for the facts of the business, and for the customer trying to decide what to do next." /><AboutSection /><TrustSection /><ClosingSection /></main>;
}

type FormValues = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  webPresence: string;
  customerAction: string;
  packageInterest: string;
  timing: string;
  message: string;
  consent: boolean;
  websiteConfirm: string;
};

const blankForm: FormValues = {
  name: '', businessName: '', email: '', phone: '', website: '', businessType: '', webPresence: '',
  customerAction: '', packageInterest: '', timing: '', message: '', consent: false, websiteConfirm: '',
};

function ConsultationForm() {
  const [values, setValues] = useState<FormValues>(blankForm);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle');
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success' || status === 'failure') {
      errorSummaryRef.current?.focus();
    }
  }, [status]);

  const update = (key: keyof FormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };
  const validateStep = (targetStep: number) => {
    const nextErrors: Record<string, string> = {};
    if (targetStep === 1) {
      if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
      if (!values.businessName.trim()) nextErrors.businessName = 'Please enter your business name.';
      if (!values.email.trim()) nextErrors.email = 'Please enter your work email.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.';
    }
    if (targetStep === 2) {
      if (!values.businessType.trim()) nextErrors.businessType = 'Please tell us what kind of business you run.';
      if (!values.webPresence) nextErrors.webPresence = 'Please choose the closest fit.';
      if (!values.customerAction) nextErrors.customerAction = 'Please choose a primary customer action.';
      if (!values.packageInterest) nextErrors.packageInterest = 'Please choose a package interest.';
      if (!values.timing) nextErrors.timing = 'Please choose a desired timing.';
      if (!values.message.trim()) nextErrors.message = 'Please share what you would like the website to help accomplish.';
      if (!values.consent) nextErrors.consent = 'Consent is required to request a consultation.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
    return !Object.keys(nextErrors).length;
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(2)) return;
    setStatus('submitting');
    window.setTimeout(() => {
      if (values.websiteConfirm) setStatus('failure');
      else setStatus('success');
    }, 500);
  };

  if (status === 'success') {
    return <div className="preview-success" tabIndex={-1} ref={errorSummaryRef} data-testid="status-preview-success"><p className="eyebrow">Private preview only</p><h2>Thanks for shaping the brief.</h2><p>Preview only — your consultation request was not sent. Secure email delivery will be connected and tested before launch.</p><button type="button" className="button-vim button-primary" style={{ marginTop: 22 }} onClick={() => { setValues(blankForm); setStep(1); setStatus('idle'); }} data-testid="button-start-another">Start another request <RotateCcw size={15} aria-hidden="true" /></button></div>;
  }
  if (status === 'failure') {
    return <div className="form-error-summary" tabIndex={-1} ref={errorSummaryRef} data-testid="status-preview-failure"><strong>Preview could not complete.</strong><p style={{ margin: '6px 0 12px' }}>Nothing was sent or stored. Please check the form and try the private preview again.</p><button type="button" className="button-vim button-dark" onClick={() => setStatus('idle')} data-testid="button-retry-preview">Try again</button></div>;
  }

  return (
    <form className="form-shell" onSubmit={submit} noValidate aria-label="Website consultation request form">
      {Object.keys(errors).length > 0 && <div className="form-error-summary" tabIndex={-1} ref={errorSummaryRef} role="alert" data-testid="status-form-errors"><strong>There is something to check.</strong><p style={{ margin: '5px 0 0' }}>Review the highlighted fields below before continuing.</p></div>}
      <div className="form-step"><span className="step-indicator">Step {step} of 2</span><span className="progress-track" aria-hidden="true"><i style={{ width: step === 1 ? '50%' : '100%' }} /></span></div>
      {step === 1 ? (
        <div>
          <div className="field"><label htmlFor="name">Name <span className="required" aria-hidden="true">*</span></label><input id="name" name="name" autoComplete="name" value={values.name} onChange={(e) => update('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'error-name' : undefined} data-testid="input-name" />{errors.name && <p id="error-name" className="field-error">{errors.name}</p>}</div>
          <div className="field"><label htmlFor="businessName">Business name <span className="required" aria-hidden="true">*</span></label><input id="businessName" name="businessName" autoComplete="organization" value={values.businessName} onChange={(e) => update('businessName', e.target.value)} aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? 'error-businessName' : undefined} data-testid="input-business-name" />{errors.businessName && <p id="error-businessName" className="field-error">{errors.businessName}</p>}</div>
          <div className="field"><label htmlFor="email">Work email <span className="required" aria-hidden="true">*</span></label><input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => update('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'error-email' : undefined} data-testid="input-email" />{errors.email && <p id="error-email" className="field-error">{errors.email}</p>}</div>
          <div className="field"><label htmlFor="phone">Phone <span style={{ fontWeight: 400, color: '#4f544e' }}>(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => update('phone', e.target.value)} data-testid="input-phone" /></div>
          <div className="field"><label htmlFor="website">Existing website or social link <span style={{ fontWeight: 400, color: '#4f544e' }}>(optional)</span></label><input id="website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://" value={values.website} onChange={(e) => update('website', e.target.value)} data-testid="input-website" /></div>
          <input name="websiteConfirm" tabIndex={-1} autoComplete="off" value={values.websiteConfirm} onChange={(e) => update('websiteConfirm', e.target.value)} aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1 }} />
          <div className="form-actions"><span className="support-line">Your details stay in this private preview.</span><button type="button" className="button-vim button-dark" onClick={() => validateStep(1) && setStep(2)} data-testid="button-next-step">Continue <ArrowRight size={16} aria-hidden="true" /></button></div>
        </div>
      ) : (
        <div>
          <div className="field"><label htmlFor="businessType">Business type <span className="required" aria-hidden="true">*</span></label><input id="businessType" name="businessType" placeholder="For example, home maintenance or studio" value={values.businessType} onChange={(e) => update('businessType', e.target.value)} aria-invalid={Boolean(errors.businessType)} data-testid="input-business-type" />{errors.businessType && <p className="field-error">{errors.businessType}</p>}</div>
          <SelectField id="webPresence" label="Current web presence" value={values.webPresence} onChange={(value) => update('webPresence', value)} options={['No website', 'Social media only', 'Existing website', 'Other']} error={errors.webPresence} />
          <SelectField id="customerAction" label="Primary customer action" value={values.customerAction} onChange={(value) => update('customerAction', value)} options={['Call', 'Request a quote', 'Book', 'Buy', 'Visit', 'Other']} error={errors.customerAction} />
          <SelectField id="packageInterest" label="Package interest" value={values.packageInterest} onChange={(value) => update('packageInterest', value)} options={['Launch Page', 'Business Site', 'Not sure']} error={errors.packageInterest} />
          <SelectField id="timing" label="Desired timing" value={values.timing} onChange={(value) => update('timing', value)} options={['As soon as practical', 'Within 30 days', '1–3 months', 'Exploring']} error={errors.timing} />
          <div className="field"><label htmlFor="message">What would you like the new website to help your business accomplish? <span className="required" aria-hidden="true">*</span></label><textarea id="message" name="message" value={values.message} onChange={(e) => update('message', e.target.value)} aria-invalid={Boolean(errors.message)} data-testid="input-message" />{errors.message && <p className="field-error">{errors.message}</p>}</div>
          <label className="consent"><input type="checkbox" name="consent" checked={values.consent} onChange={(e) => update('consent', e.target.checked)} aria-invalid={Boolean(errors.consent)} data-testid="input-consent" /><span>I acknowledge the <Link href="/privacy" data-testid="link-form-privacy">privacy notice placeholder</Link> and authorize VIM Webworks to respond to this request. This is not marketing consent. <span className="required" aria-hidden="true">*</span>{errors.consent && <span className="field-error" style={{ display: 'block' }}>{errors.consent}</span>}</span></label>
          <div className="form-actions"><button type="button" className="button-vim" onClick={() => { setStep(1); setErrors({}); }} data-testid="button-previous-step">Back</button><button type="submit" className="button-vim button-primary" disabled={status === 'submitting'} data-testid="button-submit-consultation">{status === 'submitting' ? 'Preparing private preview…' : 'Request a Website Consultation'} <ArrowUpRight size={16} aria-hidden="true" /></button></div>
        </div>
      )}
    </form>
  );
}

function SelectField({ id, label, value, onChange, options, error }: { id: string; label: string; value: string; onChange: (value: string) => void; options: string[]; error?: string }) {
  return <div className="field"><label htmlFor={id}>{label} <span className="required" aria-hidden="true">*</span></label><select id={id} name={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} data-testid={`select-${id}`}><option value="">Choose one</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select>{error && <p className="field-error">{error}</p>}</div>;
}

export function ConsultationPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Request a consultation / private preview" title={<>Let’s make the<br /><span className="signature">next step</span> clear.</>} description="Tell VIM Webworks where your business is today and what customers should be able to do next. This form is a private preview: it never sends or stores data." />
      <section className="interior-content" aria-labelledby="consultation-form-heading">
        <div className="container-vim contact-layout">
          <aside className="contact-aside">
            <p className="eyebrow">A good first conversation</p>
            <h2 id="consultation-form-heading">Useful details over polished pitches.</h2>
            <p>Share the shape of the business, your current web presence, and the action that matters most. VIM Webworks can then review fit and direction.</p>
            <p>Intended consultation destination: <a href={`mailto:${siteData.email}`} data-testid="link-consultation-email">{siteData.email}</a></p>
            <p className="eyebrow" style={{ marginTop: 32, color: 'var(--citrus)' }}>No email is activated in this preview.</p>
          </aside>
          <div>
            <ConsultationForm />
            <p className="eyebrow" style={{ marginTop: 16 }}>Private preview / no data transmission / no data storage</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy';
  return (
    <main id="main-content">
      <PageHero eyebrow={`Draft placeholder / ${privacy ? 'privacy' : 'terms'}`} title={privacy ? 'A privacy notice to review.' : 'Terms that still need approval.'} description="This page is intentionally a clearly labeled draft placeholder. It is not legal advice and must be reviewed and replaced before any public launch." />
      <section className="interior-content">
        <div className="container-vim interior-narrow">
          <div className="draft-notice"><strong>Draft placeholder — not legally reviewed.</strong> This content is included to show the intended page location and disclosure behavior. Do not treat it as a final policy.</div>
          <div className="legal-copy">
            {privacy ? (
              <>
                <h2>What this draft should cover</h2>
                <p>A final privacy notice should explain what information VIM Webworks collects, why it is used, how it is protected, whether any service providers process it, how long it is retained, and what choices or rights are available.</p>
                <h2>Private preview behavior</h2>
                <p>In this private preview, the consultation form validates in the browser only. It does not send, transmit, or store personal data. The intended consultation destination is visible copy only.</p>
                <h2>Owner review required</h2>
                <p>Before launch, replace this placeholder with an approved notice that matches the final form handler, hosting, email delivery, retention, and any third-party services actually connected.</p>
              </>
            ) : (
              <>
                <h2>What this draft should cover</h2>
                <p>Final terms should describe the service scope, written approval, deposits and payment conditions, revision rounds, turnaround targets, ownership and access, third-party costs, care terms, cancellation, limitations, and a process for resolving questions.</p>
                <h2>No public service agreement yet</h2>
                <p>Package descriptions and prices on this preview are an outline for discussion. They do not replace a written scope or accepted order.</p>
                <h2>Owner review required</h2>
                <p>This placeholder must be reviewed and replaced before any public launch. It is not legal advice and does not create a contract.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}