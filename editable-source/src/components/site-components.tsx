import { ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { type KeyboardEvent as ReactKeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { siteData, type ConceptProject } from '@/data/site-data';

function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vim-webworks-logo${light ? '-light' : ''}.png`}
      alt="VIM Webworks"
      className="site-logo-image"
    />
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
    window.setTimeout(() => openButtonRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !mobileNavRef.current) return;
    const focusable = Array.from(
      mobileNavRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      ),
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="site-header" aria-label="Site header">
        <div className="container-vim header-inner">
          <Link href="/" className="site-logo-link" aria-label="VIM Webworks home" data-testid="link-home"><SiteLogo /></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {siteData.nav.map((item) => (
              <Link href={item.href} key={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</Link>
            ))}
          </nav>
          <Link href="/consultation" className="button-vim button-primary header-cta" data-testid="link-header-consultation">
            Request a Website Consultation <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            ref={openButtonRef}
            className="menu-button"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            data-testid="button-open-menu"
          >
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </header>
      {menuOpen && (
        <div ref={mobileNavRef} className="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation" onKeyDown={handleMenuKeyDown}>
          <div className="mobile-nav-head">
            <Link href="/" className="site-logo-link" aria-label="VIM Webworks home" data-testid="link-mobile-home"><SiteLogo light /></Link>
            <button
              ref={closeButtonRef}
              className="mobile-nav-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              data-testid="button-close-menu"
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-nav-links" aria-label="Mobile primary navigation">
            {siteData.nav.map((item) => (
              <Link href={item.href} key={item.href} data-testid={`link-mobile-${item.href.slice(1)}`}>{item.label}</Link>
            ))}
          </nav>
          <Link href="/consultation" className="button-vim button-primary" data-testid="link-mobile-consultation">
            Request a Website Consultation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-vim">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="site-logo-link" aria-label="VIM Webworks home" data-testid="link-footer-home"><SiteLogo light /></Link>
            <p>{siteData.hero.headline}</p>
            <a className="text-link" href={`mailto:${siteData.email}`} data-testid="link-footer-email">{siteData.email}</a>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            {siteData.nav.map((item) => (
              <Link href={item.href} key={item.href} data-testid={`link-footer-${item.href.slice(1)}`}>{item.label}</Link>
            ))}
            <Link href="/privacy" data-testid="link-footer-privacy">Privacy placeholder</Link>
            <Link href="/terms" data-testid="link-footer-terms">Terms placeholder</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>{siteData.privatePreviewLabel}</span>
          <span>Consultation destination: {siteData.email}</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell grain">
      <a href="#main-content" className="skip-link" data-testid="link-skip-content">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return (
    <section className="page-hero">
      <div className="container-vim">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal reveal-delay-1">{title}</h1>
        <p className="reveal reveal-delay-2">{description}</p>
      </div>
    </section>
  );
}

export function ProjectCanvas({ project, large = false }: { project: ConceptProject; large?: boolean }) {
  const canvasCopy = {
    northline: { label: 'Northline / 01', heading: <>Good work.<br /><em>Made clear.</em></>, sub: 'Home maintenance, made easier to navigate.' },
    mesa: { label: 'Mesa Table / 02', heading: <>Come hungry.<br /><em>Stay awhile.</em></>, sub: 'A neighborhood kitchen with a generous table.' },
    alder: { label: 'Alder & Finch / 03', heading: <>Think well.<br /><em>Move surely.</em></>, sub: 'Advisory for the next considered decision.' },
  }[project.variant];
  return (
    <div className={`project-canvas ${project.variant}-canvas ${large ? 'project-canvas-large' : ''}`} aria-label={`${project.name} sample project concept canvas`}>
      <div className="canvas-browser-bar" aria-hidden="true"><i /><i /><i /><span>vim preview / {project.slug}</span></div>
      <div className="canvas-stamp eyebrow">Sample project / concept</div>
      <div className="canvas-nav"><i aria-hidden="true" /> {canvasCopy.label}</div>
      <div className="canvas-heading">{canvasCopy.heading}</div>
      <p className="canvas-sub">{canvasCopy.sub}</p>
      <div className="canvas-cta">{project.action} <ArrowUpRight size={12} aria-hidden="true" /></div>
    </div>
  );
}

export function WorkItem({ project, index }: { project: ConceptProject; index: number }) {
  const rememberGalleryPosition = () => {
    sessionStorage.setItem('vim-work-scroll-position', String(window.scrollY));
  };

  return (
    <article className="work-item" data-testid={`card-concept-project-${index}`}>
      <Link href={`/samples/${project.slug}`} className="work-item-preview" aria-label={`View interactive sample for ${project.name}`} onClick={rememberGalleryPosition} data-testid={`link-sample-preview-${project.slug}`}>
        <ProjectCanvas project={project} large />
      </Link>
      <div className="work-item-info">
        <div>
          <span className="concept-label">Sample project / concept</span>
          <h3>{project.name}</h3>
          <dl className="work-item-meta">
            <div><dt>Industry</dt><dd>{project.industry}</dd></div>
            <div><dt>Package</dt><dd>{project.category}</dd></div>
            <div><dt>Primary action</dt><dd>{project.action}</dd></div>
            <div><dt>Design objective</dt><dd>{project.objective}</dd></div>
          </dl>
          <p>{project.description}</p>
          <div className="work-item-actions">
            <Link href={`/samples/${project.slug}`} className="text-link" onClick={rememberGalleryPosition} data-testid={`link-view-sample-${project.slug}`}>View Interactive Sample <ArrowUpRight size={15} aria-hidden="true" /></Link>
            <Link href="/consultation" className="text-link work-consult-link" data-testid={`link-consult-sample-${project.slug}`}>Request a Website Consultation <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
        <span className="work-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
      </div>
    </article>
  );
}

export function SectionMarker({ number, label }: { number: string; label: string }) {
  return <p className="eyebrow"><span style={{ color: 'var(--clay)' }}>{number}</span> / {label}</p>;
}

export function PrincipleList({ items }: { items: readonly string[] }) {
  return (
    <div className="principles">
      {items.map((item, index) => (
        <div className="principle" key={item}><span>0{index + 1}</span>{item}<Check size={15} aria-hidden="true" /></div>
      ))}
    </div>
  );
}