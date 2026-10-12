export type NavItem = { label: string; href: string };

export type ConceptProject = {
  slug: string;
  name: string;
  industry: 'Home Services' | 'Restaurant & Retail' | 'Professional Services';
  category: 'Business Site' | 'Launch Page';
  action: string;
  description: string;
  objective: string;
  variant: 'northline' | 'mesa' | 'alder';
};

export type Package = {
  name: string;
  price: string;
  best?: string;
  description: string;
  inclusions: string[];
  timing?: string;
  note?: string;
};

export const siteData = {
  name: 'VIM Webworks',
  email: 'judah@vimwebworks.com',
  privatePreviewLabel: 'Private preview · not yet public',
  nav: [
    { label: 'Sample Work', href: '/work' },
    { label: 'Services & Pricing', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'About', href: '/about' },
    { label: 'Consultation', href: '/consultation' },
  ] satisfies NavItem[],
  hero: {
    eyebrow: 'Strategy · Design · Build · Care',
    headline: "You built the business. We'll build the website.",
    supporting:
      'Your business already has momentum on social media. VIM Webworks gives customers one credible place to understand what you do and request the next step.',
  },
  overview: {
    heading: 'A professional website process without the traditional agency maze.',
    rows: [
      'Clear package and price',
      'Owner-approved facts and assets',
      'Mobile-first private preview',
      'Written approval before launch',
    ],
    note: 'Scope, revision rounds, and next steps stay visible from the beginning.',
  },
  social: {
    heading: 'Your social pages show the activity. Your website should bring the business together.',
    body:
      'Facebook, Instagram, X/Twitter, and other social platforms can help customers discover your work, but they do not give you one controlled place to explain the full offer, organize essential information, and guide people toward the next step. VIM Webworks turns owner-approved business information into a website designed around that job.',
  },
  projects: [
    {
      slug: 'northline-home-services',
      name: 'Northline Home Services',
      industry: 'Home Services',
      category: 'Business Site',
      action: 'Request a Quote',
      description: 'A practical home-maintenance concept built around clear service categories and a direct quote request.',
      objective: 'Make a varied offer feel easy to scan, understand, and act on.',
      variant: 'northline',
    },
    {
      slug: 'mesa-table-kitchen',
      name: 'Mesa Table Kitchen',
      industry: 'Restaurant & Retail',
      category: 'Business Site',
      action: 'View Menu / Call',
      description: 'A warm neighborhood-kitchen concept that puts the menu, hours, and reservation conversation in reach.',
      objective: 'Make a small menu feel generous without hiding the practical details.',
      variant: 'mesa',
    },
    {
      slug: 'alder-finch-advisory',
      name: 'Alder & Finch Advisory',
      industry: 'Professional Services',
      category: 'Launch Page',
      action: 'Request a Consultation',
      description: 'A focused advisory launch page with a calm point of view and a clear first conversation.',
      objective: 'Turn a considered service into a confident, low-friction introduction.',
      variant: 'alder',
    },
  ] satisfies ConceptProject[],
  packages: [
    {
      name: 'Launch Page',
      price: '$995',
      best: 'Recommended starting point',
      description: 'Best for a business that needs one clear, credible web presence.',
      inclusions: [
        'one polished scrolling website',
        'mobile, tablet, laptop, and wide-desktop layouts',
        'opening section with a primary customer action',
        'services overview',
        'About/business story section',
        'owner-approved reviews and media when provided',
        'hours, service area, phone, email, address, and relevant action links when applicable',
        'contact or quote-request form',
        'basic page title, meta description, social-preview placeholders, and appropriate structured-data placeholder',
        'one consolidated revision round',
        'launch checklist and short handoff guide',
      ],
      timing:
        'Turnaround target: three business days after the 50% reservation deposit and complete approved intake are received. Timing pauses when required information, assets, access, or feedback are missing. This is a target, not a guarantee.',
    },
    {
      name: 'Business Site',
      price: '$1,500',
      description: 'Best for a business needing separate pages or more service detail.',
      inclusions: [
        'everything in Launch Page',
        'up to five standard pages',
        'expanded service descriptions',
        'FAQ content',
        'dedicated contact/quote page',
        'two consolidated revision rounds',
      ],
    },
    {
      name: 'Website Care',
      price: '$150/month',
      description: 'Month-to-month and separately accepted after launch.',
      inclusions: [
        'routine website/platform maintenance',
        'monthly functional check of the homepage, navigation, and primary form',
        'backup/export check where supported',
        'basic uptime review',
        'up to two small content-change requests or 30 minutes of editing per month, whichever comes first',
        'basic analytics summary when analytics is separately approved and connected',
        'priority scheduling for additional paid work',
      ],
      note:
        'Unused editing time does not roll over. Redesigns, new pages, integrations, copywriting, photography, emergency work, and third-party troubleshooting are quoted separately. Domain registration, hosting, premium plugins, email services, booking services, paid APIs, and other third-party charges are not included unless a written order states otherwise.',
    },
  ] satisfies Package[],
  exclusions: [
    'e-commerce',
    'memberships or customer portals',
    'custom databases',
    'custom booking systems',
    'complex calculators',
    'multilingual content',
    'regulated-data workflows',
    'AI phone answering',
    'appointment automation',
    'custom software applications',
  ],
  process: [
    ['Request a consultation', 'Tell us about the business, current web presence, and what customers should do.'],
    ['Fit and direction review', 'VIM Webworks reviews the public business presence, confirms package fit, and identifies missing information.'],
    ['Written scope and deposit', 'The package, price, exclusions, revision rounds, responsibilities, and timing are confirmed in writing; production begins only after the approved 50% reservation deposit and complete intake.'],
    ['Reference and content lock', 'Approved business facts, assets, examples, and visual direction are consolidated before the build.'],
    ['Private build and refinement', 'The responsive draft is built, technically checked, and shared privately; feedback is provided as one consolidated list per included round.'],
    ['Approval, final payment, and launch', 'Public launch or transfer occurs only after factual approval and the remaining payment conditions are satisfied.'],
    ['Optional Website Care', 'Maintenance is offered under separately accepted monthly terms.'],
  ],
  about: {
    heading: 'Built for owners already doing more than one job.',
    body:
      'Running a small business can mean handling the books, marketing, sales, management, customer work, and lead generation at the same time. VIM Webworks turns the information already spread across social profiles and business materials into one clear, credible website—without asking the owner to become a web designer. We keep the scope visible, the facts owner-approved, and the path from consultation to launch practical.',
  },
  principles: [
    'Clear scope before production',
    'No invented claims or proof',
    'Mobile-first by default',
    'Private review before launch',
    'Account and asset ownership kept explicit',
  ],
  trust: [
    'Public prices and package boundaries',
    'Written scope and revision limits',
    'Owner-approved facts and assets',
    'Private preview and factual review',
    'Clear third-party-cost disclosures',
    'No launch without approval',
  ],
  closing: 'Your business already has momentum. Give customers a clearer place to meet it.',
} as const;

export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: "You built the business | VIM Webworks", description: siteData.hero.supporting },
  '/work': { title: 'Sample work | VIM Webworks', description: 'Three clearly labeled fictional sample websites for established small businesses.' },
  '/services': { title: 'Services & pricing | VIM Webworks', description: 'Public package prices, inclusions, boundaries, and timing.' },
  '/process': { title: 'Process | VIM Webworks', description: 'A clear seven-step route from consultation to launch.' },
  '/about': { title: 'About VIM Webworks', description: 'A practical, brand-led website process for established small businesses.' },
  '/consultation': { title: 'Request a website consultation | VIM Webworks', description: 'A private-preview consultation form for your business and project.' },
  '/privacy': { title: 'Draft privacy notice | VIM Webworks', description: 'A clearly labeled draft privacy notice placeholder.' },
  '/terms': { title: 'Draft terms | VIM Webworks', description: 'Clearly labeled draft terms placeholder.' },
  '/samples/northline-home-services': { title: 'Northline Home Services sample | VIM Webworks', description: 'A fictional Northline Home Services website concept by VIM Webworks.' },
  '/samples/mesa-table-kitchen': { title: 'Mesa Table Kitchen sample | VIM Webworks', description: 'A fictional Mesa Table Kitchen website concept by VIM Webworks.' },
  '/samples/alder-finch-advisory': { title: 'Alder & Finch Advisory sample | VIM Webworks', description: 'A fictional Alder & Finch Advisory website concept by VIM Webworks.' },
};