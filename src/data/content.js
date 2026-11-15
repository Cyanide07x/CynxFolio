/**
 * CYNX Folio — Content Repository
 * ALL copy, links, projects and metadata live here.
 */

export const content = {
  brand: {
    name: 'CYNX',
    title: 'CYNX Folio',
    subtitle: 'Without Sync, 2026',
    author: 'Utsav Sachan',
    role: 'Full Stack Developer & UI/UX Designer',
    metaDescription: 'Full-stack web & mobile applications engineered with modern UI/UX design systems and scalable architecture.',
  },

  nav: {
    links: [
      { id: 'home', label: 'Home' },
      { id: 'work', label: 'Work' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: "Let's talk",
  },

  home: {
    label: '# Without sync · Full stack developer + UI/UX',
    availability: 'Available for Full Stack & UI/UX roles',
    headline: {
      line1: 'Design and code,',
      line2: 'out of phase on',
      line3: 'purpose.',
    },
    description:
      "I'm Utsav, building as CYNX: full-stack applications and cross-platform experiences engineered with intuitive UI/UX design and clean, scalable code. I like things that are misaligned, with room to bring them back into sync.",
    ctaPrimary: 'Explore the sync',
    ctaSecondary: 'Get in touch',
    marquee: [
      'Python',
      'FastAPI',
      'SQL',
      'Firebase',
      'Figma',
      'Product Design',
      'Flutter',
      'Full Stack',
      'UI/UX',
    ],
  },

  work: {
    label: '# Work',
    headline: 'Selected projects, built end to end.',
    sub: 'Designed, built and shipped: end-to-end full-stack applications combining intuitive UI/UX design systems with robust engineering.',
    projects: [
      {
        id: 'cynx-kage',
        index: '01 — Featured',
        name: 'Cynx Kage',
        tagline: 'Gear for the quiet trade.',
        summary:
          'A streetwear-focused e-commerce Android application built with Flutter and Firebase. Features dual themes (Forest & Cynx), coupons engine, cart & checkout flows, and Firebase authentication.',
        bullets: [
          'Full e-commerce flow: product browsing, cart & checkout, wishlist and order management',
          'Dual dynamic themes (Forest Theme & Cynx Theme) tailored for streetwear aesthetics',
          'Coupons & offers engine (FLAT200, WELCOME10), saved addresses, and Firebase Auth',
        ],
        tags: ['Flutter', 'Android', 'Firebase', 'E-commerce', 'Dart', 'Dual Themes'],
        link: 'https://github.com/Cyanide07x/Cynx_Kage',
      },
      {
        id: 'calcynx',
        index: '02 — Project',
        name: 'CalCynx',
        summary:
          'A personal workspace and calendar app designed to keep everyday tasks, bills and important dates in one place.',
        bullets: [
          'Organize daily tasks, bills and reminders from a single workspace',
          'Switch between workspace and calendar view',
          'Built with Flutter for every platform',
        ],
        tags: ['Flutter', 'Product design'],
        tasks: [
          { id: 'task-1', title: 'Electricity bill', date: '14', completed: false },
          { id: 'task-2', title: 'Team sync notes', date: 'Today', completed: true },
          { id: 'task-3', title: 'Renew subscription', date: 'Mon', completed: false },
          { id: 'task-4', title: 'Plan next sprint', date: 'Next', completed: false },
        ],
      },
    ],
  },

  about: {
    label: '# About',
    headline: 'I work on things that stopped syncing.',
    headlinePrefix: 'I work on things that',
    headlineHighlight: 'stopped syncing.',
    description:
      "I'm a Full Stack Developer & UI/UX Designer, combining end-to-end software engineering with human-centered product design. I work at the intersection of creative visual systems and scalable architecture — turning complex workflows into responsive, high-performance web and mobile experiences.",
    techStack: [
      'Python',
      'SQL',
      'FastAPI',
      'Firebase',
      'Figma',
      'Flutter',
      'Product Design',
      'UI/UX',
    ],
    cards: [
      {
        number: '01',
        title: 'UI/UX & Product Design',
        description: 'Designing intuitive user interfaces, wireframes, and design systems in Figma centered around usability and clear visual hierarchies.',
        tags: ['Figma', 'Product Design', 'UI/UX', 'Design Systems'],
      },
      {
        number: '02',
        title: 'Backend & Data Engineering',
        description: 'Building asynchronous REST APIs, database schemas, and cloud authentication with high performance and reliability.',
        tags: ['Python', 'SQL', 'FastAPI', 'Firebase'],
      },
      {
        number: '03',
        title: 'Mobile & Full Stack Apps',
        description: 'Architecting scalable cross-platform mobile apps and modern web frontends with clean state management and fluid animations.',
        tags: ['Flutter', 'Dart', 'React', 'Cross-Platform'],
      },
    ],
  },

  contact: {
    label: '# Contact',
    headline: "Let's get in sync.",
    headlinePrefix: "Let's get in",
    headlineHighlight: 'sync.',
    text: "Tell me what's misaligned and what you're trying to build. I reply within two working days.",
    email: 'utsav0724@gmail.com',
    location: 'Remote, working worldwide',
    elsewhere: 'Discord',
    discordUser: 'cyanide.lc',
    form: {
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: "Tell me what's misaligned and what you're trying to build...",
      submitButton: 'Send message →',
      successMessage: 'Back in sync. Your message has been received.',
    },
  },

  footer: {
    copy: 'CYNX — Without Sync, 2026',
    links: [
      { label: 'GitHub', url: 'https://github.com/Cyanide07x', external: true },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/utsav-sachan-7759b4250/', external: true },
      { label: 'Resume ↗', url: './assets/resume/Utsav_Sachan_Resume_cynx.pdf', external: true, isPill: true },
    ],
  },
};
