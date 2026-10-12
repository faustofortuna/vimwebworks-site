import { ArrowDown, ArrowUpRight, Check, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { siteData, type ConceptProject } from '@/data/site-data';

type SamplePageProps = { project: ConceptProject };

const sampleContent = {
  northline: {
    city: 'Ridgeway · serving the surrounding homes',
    kicker: 'Home maintenance, made easier to navigate.',
    headline: <>Good work.<br /><i>Made clear.</i></>,
    intro: 'A practical home-services concept for the jobs that keep a house working well. Start with the service, the situation, or the next step.',
    cta: 'Request a Quote',
    secondary: 'See services',
    nav: ['Services', 'How it works', 'Service area'],
    services: [
      ['01', 'Seasonal upkeep', 'Routine exterior checks, small repairs, and the jobs that are easy to postpone.'],
      ['02', 'Repairs & fixes', 'A clear first look at the problem, followed by a practical plan for the work.'],
      ['03', 'Move-in help', 'A punch list for a new place, from the small adjustments to the visible finish.'],
    ],
    asideTitle: 'The useful kind of ready.',
    asideBody: 'Northline is a fictional home-maintenance concept. Its site is designed to help a homeowner understand fit before asking for a quote.',
    accent: 'northline',
  },
  mesa: {
    city: 'Old Market · Tuesday through Saturday',
    kicker: 'A neighborhood kitchen with a generous table.',
    headline: <>Come hungry.<br /><i>Stay awhile.</i></>,
    intro: 'A fictional neighborhood kitchen for bright plates, slow evenings, and the kind of menu that gives you a reason to come back.',
    cta: 'View Menu',
    secondary: 'Find the table',
    nav: ['Menu', 'The room', 'Hours'],
    services: [
      ['01', 'The menu', 'A short, changing list built around the market, the season, and what sounds good today.'],
      ['02', 'The room', 'A long table, a few quiet corners, and a welcome that does not need a special occasion.'],
      ['03', 'The rhythm', 'Come by for dinner, stay for something sweet, or call ahead for the evening ahead.'],
    ],
    asideTitle: 'Food with a point of view.',
    asideBody: 'Mesa Table Kitchen is a fictional restaurant concept. Menu language, hours, and location details are illustrative only.',
    accent: 'mesa',
  },
  alder: {
    city: 'Independent advisory · private preview concept',
    kicker: 'A considered partner for the next decision.',
    headline: <>Think well.<br /><i>Move surely.</i></>,
    intro: 'A focused launch-page concept for leaders who need a clear outside perspective before they commit to the next move.',
    cta: 'Request a Consultation',
    secondary: 'How we work',
    nav: ['Perspective', 'Approach', 'First conversation'],
    services: [
      ['01', 'Clarify the question', 'Put the real decision on the table, without rushing to the answer that is easiest to name.'],
      ['02', 'Make the shape visible', 'Bring the constraints, options, and trade-offs into a conversation you can use.'],
      ['03', 'Choose the next move', 'Leave with a more useful point of view and a practical next step to carry forward.'],
    ],
    asideTitle: 'Useful distance.',
    asideBody: 'Alder & Finch Advisory is a fictional advisory concept. It does not represent a real firm, client, result, or promise.',
    accent: 'alder',
  },
} as const;

function ConceptBanner() {
  return <div className="sample-concept-banner">Sample website concept by VIM Webworks — fictional business.</div>;
}

function SampleHeader({ project, content }: { project: ConceptProject; content: (typeof sampleContent)[keyof typeof sampleContent] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        setMenuOpen(false);
        window.setTimeout(() => openRef.current?.focus(), 0);
      }
      if (event.key === 'Tab' && navRef.current) {
        const focusable = Array.from(navRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
        if (focusable.length && event.shiftKey && document.activeElement === focusable[0]) {
          event.preventDefault();
          focusable[focusable.length - 1].focus();
        } else if (focusable.length && !event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
          event.preventDefault();
          focusable[0].focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => openRef.current?.focus(), 0);
  };

  return (
    <>
      <header className="sample-header">
        <div className="sample-header-inner">
          <Link href="/work" className="sample-exit" data-testid={`link-exit-sample-${project.slug}`}>← Back to sample work</Link>
          <div className="sample-wordmark" aria-label={project.name}>{project.name}</div>
          <nav className="sample-desktop-nav" aria-label={`${project.name} sample navigation`}>
            {content.nav.map((item, index) => <a href={`#sample-${['services', 'room', 'contact'][index]}`} key={item}>{item}</a>)}
          </nav>
          <Link href="/consultation" className="sample-header-cta" data-testid={`link-sample-header-consultation-${project.slug}`}>Talk to VIM <ArrowUpRight size={14} aria-hidden="true" /></Link>
          <Link href="/work" className="sample-close-preview" aria-label="Close interactive sample" data-testid={`link-close-sample-${project.slug}`}><X size={17} aria-hidden="true" /></Link>
          <button ref={openRef} type="button" className="sample-menu-button" aria-label={`Open ${project.name} navigation`} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} data-testid={`button-open-sample-menu-${project.slug}`}><Menu size={18} aria-hidden="true" /></button>
        </div>
      </header>
      {menuOpen && (
        <div className="sample-mobile-menu" role="dialog" aria-modal="true" aria-label={`${project.name} sample navigation`} ref={navRef}>
          <div className="sample-mobile-menu-top">
            <span className="sample-wordmark">{project.name}</span>
            <button ref={closeRef} type="button" className="sample-menu-button sample-menu-close" aria-label="Close sample navigation" onClick={closeMenu} data-testid={`button-close-sample-menu-${project.slug}`}><X size={19} aria-hidden="true" /></button>
          </div>
          <nav aria-label={`Mobile ${project.name} sample navigation`}>
            {content.nav.map((item, index) => <a href={`#sample-${['services', 'room', 'contact'][index]}`} key={item} onClick={closeMenu}>{item}</a>)}
          </nav>
          <Link href="/consultation" className="button-vim button-primary" onClick={closeMenu} data-testid={`link-mobile-sample-consultation-${project.slug}`}>Request a Website Consultation <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      )}
    </>
  );
}

function SampleAction({ project, content, onNotice }: { project: ConceptProject; content: (typeof sampleContent)[keyof typeof sampleContent]; onNotice: (message: string) => void }) {
  if (project.variant === 'mesa') {
    return (
      <div className="sample-actions">
        <a className="sample-button sample-button-solid" href="#sample-services" data-testid="link-mesa-view-menu">{content.cta} <ArrowDown size={15} aria-hidden="true" /></a>
        <button type="button" className="sample-button sample-button-quiet" onClick={() => onNotice('Preview only — no call was placed.')} data-testid="button-mesa-call"><Phone size={15} aria-hidden="true" /> Call the kitchen</button>
      </div>
    );
  }
  return (
    <div className="sample-actions">
      <Link href="/consultation" className="sample-button sample-button-solid" data-testid={`link-sample-primary-${project.slug}`}>{content.cta} <ArrowUpRight size={15} aria-hidden="true" /></Link>
      <a className="sample-button sample-button-quiet" href="#sample-services" data-testid={`link-sample-secondary-${project.slug}`}>{content.secondary} <ArrowDown size={15} aria-hidden="true" /></a>
    </div>
  );
}

function SampleSections({ project, content, onNotice }: { project: ConceptProject; content: (typeof sampleContent)[keyof typeof sampleContent]; onNotice: (message: string) => void }) {
  return (
    <>
      <section className="sample-intro-section" id="sample-services">
        <div className="sample-section-label">01 / What matters first</div>
        <div className="sample-intro-grid">
          <h2>{content.asideTitle}</h2>
          <p>{content.asideBody}</p>
        </div>
      </section>
      <section className="sample-services-section" id="sample-room">
        <div className="sample-section-label">02 / The shape of the offer</div>
        <div className="sample-service-list">
          {content.services.map(([number, title, body]) => (
            <article className="sample-service-row" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <ArrowUpRight size={20} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
      <section className={`sample-detail-section sample-detail-${content.accent}`}>
        <div className="sample-detail-card">
          <p className="sample-section-label">03 / A useful detail</p>
          {project.variant === 'northline' && <><h2>One clear path through a varied list.</h2><p>Services are grouped around the homeowner's question, so the site can be useful before a customer knows the right trade or term.</p><div className="sample-detail-list"><span><Check size={15} /> Start with the situation</span><span><Check size={15} /> See the next step</span><span><Check size={15} /> Ask for a practical quote</span></div></>}
          {project.variant === 'mesa' && <><h2>The menu is part of the welcome.</h2><p>Short descriptions, a visible rhythm, and the useful details make this fictional kitchen feel open before a guest arrives.</p><div className="sample-menu-lines"><span>House focaccia <b>8</b></span><span>Market greens <b>14</b></span><span>Charred chicken <b>24</b></span><span>Something sweet <b>9</b></span></div></>}
          {project.variant === 'alder' && <><h2>Good counsel starts with a better question.</h2><p>A quieter launch page can earn attention by naming the work precisely and leaving room for the first conversation.</p><div className="sample-detail-list"><span><Check size={15} /> No inflated promise</span><span><Check size={15} /> No borrowed proof</span><span><Check size={15} /> A clear invitation</span></div></>}
        </div>
      </section>
      <section className="sample-contact-section" id="sample-contact">
        <div>
          <p className="sample-section-label">04 / The next conversation</p>
          <h2>{project.variant === 'mesa' ? 'Find your way to the table.' : project.variant === 'northline' ? 'Tell us what needs doing.' : 'Bring the real question.'}</h2>
        </div>
        <div className="sample-contact-copy">
          <p>{project.variant === 'mesa' ? 'This concept keeps the invitation simple: see what is on, check the rhythm, then get in touch.' : 'This sample ends where a real website should begin: with enough clarity for a useful next step.'}</p>
          {project.variant === 'mesa' ? <button type="button" className="sample-button sample-button-light" onClick={() => onNotice('Preview only — this fictional kitchen does not take reservations.')} data-testid="button-mesa-reservation">Call for the evening <Phone size={15} aria-hidden="true" /></button> : <Link href="/consultation" className="sample-button sample-button-light" data-testid={`link-sample-contact-${project.slug}`}>{content.cta} <ArrowUpRight size={15} aria-hidden="true" /></Link>}
        </div>
      </section>
    </>
  );
}

export function SamplePage({ project }: SamplePageProps) {
  const content = sampleContent[project.variant];
  const [notice, setNotice] = useState('');
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const exitOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLocation('/work');
    };
    window.addEventListener('keydown', exitOnEscape);
    return () => window.removeEventListener('keydown', exitOnEscape);
  }, [setLocation]);

  return (
    <main id="main-content" className={`sample-site sample-site-${content.accent}`}>
      <a href="#sample-services" className="sample-skip">Skip to sample content</a>
      <ConceptBanner />
      <SampleHeader project={project} content={content} />
      <section className="sample-hero">
        <div className="sample-hero-top">
          <p className="sample-location">{content.city}</p>
          <p className="sample-index">Concept / {String(siteData.projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, '0')}</p>
        </div>
        <div className="sample-hero-grid">
          <div>
            <p className="sample-kicker">{content.kicker}</p>
            <h1>{content.headline}</h1>
            <p className="sample-hero-intro">{content.intro}</p>
            <SampleAction project={project} content={content} onNotice={setNotice} />
            {notice && <p className="sample-notice" role="status" aria-live="polite">{notice}</p>}
          </div>
          <div className="sample-hero-art" aria-label={`${project.name} abstract concept artwork`}>
            <span className="sample-art-word">{project.variant === 'northline' ? 'N / 01' : project.variant === 'mesa' ? 'M / 02' : 'A / 03'}</span>
            <span className="sample-art-line" />
            <span className="sample-art-note">{content.secondary}</span>
          </div>
        </div>
        <a href="#sample-services" className="sample-scroll-cue" aria-label="Scroll to sample details"><ArrowDown size={16} aria-hidden="true" /> Scroll through the concept</a>
      </section>
      <SampleSections project={project} content={content} onNotice={setNotice} />
      <section className="sample-footer">
        <div className="sample-footer-brand">{project.name}</div>
        <p>Fictional sample website concept by VIM Webworks. Built for review, not for live use.</p>
        <Link href="/work" className="sample-button sample-button-light" data-testid={`link-return-work-${project.slug}`}>Return to sample work <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}

export function NorthlineSamplePage() {
  return <SamplePage project={siteData.projects.find((project) => project.slug === 'northline-home-services') ?? siteData.projects[0]} />;
}

export function MesaSamplePage() {
  return <SamplePage project={siteData.projects.find((project) => project.slug === 'mesa-table-kitchen') ?? siteData.projects[1]} />;
}

export function AlderSamplePage() {
  return <SamplePage project={siteData.projects.find((project) => project.slug === 'alder-finch-advisory') ?? siteData.projects[2]} />;
}