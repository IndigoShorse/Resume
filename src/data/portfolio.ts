import { withBase } from '@/utils/url'
import { format, getDict, type Locale } from '@/i18n'

export interface PortfolioImage {
  src: string
  alt: string
  caption?: string
}

export interface PortfolioProject {
  visibleInPortfolio?: boolean
  title: string
  category: string
  summary: string
  details: string[]
  stack: string[]
  links?: { label: string; href: string; internal?: boolean }[]
  images: PortfolioImage[]
}

// Иллюстрации показывают компоновку, а не реальные экраны закрытых проектов.
export function getPortfolio(locale: Locale): PortfolioProject[] {
  const dict = getDict(locale).portfolio
  const projects = dict.projects

  function illustration(title: string, variant: 'overview' | 'detail', accent: string): PortfolioImage {
  const detail = variant === 'detail'
  const label = detail ? dict.illustration.detail : dict.illustration.overview
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
    <rect width="1200" height="760" fill="#eaf0f5"/>
    <rect x="65" y="65" width="1070" height="630" rx="22" fill="#fff" stroke="#d6e0e9" stroke-width="2"/>
    <path d="M65 112h1070" stroke="#d6e0e9" stroke-width="2"/>
    <circle cx="97" cy="88" r="6" fill="#d6e0e9"/><circle cx="119" cy="88" r="6" fill="#d6e0e9"/><circle cx="141" cy="88" r="6" fill="#d6e0e9"/>
    <rect x="96" y="145" width="185" height="518" rx="12" fill="#f5f8fa"/>
    <rect x="118" y="172" width="82" height="11" rx="5" fill="${accent}"/>
    <rect x="118" y="221" width="116" height="9" rx="4" fill="#bdcbd5"/>
    <rect x="118" y="253" width="134" height="9" rx="4" fill="#bdcbd5"/>
    <rect x="118" y="285" width="98" height="9" rx="4" fill="#bdcbd5"/>
    <rect x="118" y="317" width="124" height="9" rx="4" fill="#bdcbd5"/>
    <text x="320" y="188" fill="#172a3a" font-size="28" font-family="Arial, sans-serif" font-weight="700">${title}</text>
    <text x="320" y="224" fill="#728392" font-size="16" font-family="Arial, sans-serif">${label} · ${dict.illustration.scheme}</text>
    ${detail
      ? `<rect x="320" y="265" width="760" height="74" rx="12" fill="#f3f7f9"/><rect x="344" y="288" width="230" height="12" rx="6" fill="#bdcbd5"/><rect x="344" y="312" width="380" height="8" rx="4" fill="#d9e3e9"/><rect x="320" y="365" width="760" height="255" rx="12" fill="#f7fafb" stroke="#e2e9ee"/><rect x="350" y="396" width="300" height="13" rx="6" fill="${accent}"/><rect x="350" y="435" width="675" height="9" rx="4" fill="#d9e3e9"/><rect x="350" y="463" width="600" height="9" rx="4" fill="#d9e3e9"/><rect x="350" y="491" width="640" height="9" rx="4" fill="#d9e3e9"/><rect x="350" y="552" width="150" height="38" rx="8" fill="${accent}"/>`
      : `<rect x="320" y="265" width="760" height="120" rx="12" fill="${accent}" opacity=".16"/><rect x="345" y="293" width="245" height="13" rx="6" fill="${accent}"/><rect x="345" y="324" width="380" height="9" rx="4" fill="#aebdc8"/><rect x="320" y="412" width="238" height="208" rx="12" fill="#f3f7f9"/><rect x="581" y="412" width="238" height="208" rx="12" fill="#f3f7f9"/><rect x="842" y="412" width="238" height="208" rx="12" fill="#f3f7f9"/><rect x="345" y="442" width="120" height="11" rx="5" fill="${accent}"/><rect x="606" y="442" width="120" height="11" rx="5" fill="${accent}"/><rect x="867" y="442" width="120" height="11" rx="5" fill="${accent}"/>`}
    <text x="1068" y="662" text-anchor="end" fill="#8999a5" font-size="13" font-family="Arial, sans-serif">${dict.illustration.watermark}</text>
  </svg>`
    return { src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, alt: format(dict.illustration.alt, { title, label: label.toLowerCase() }) }
  }

  return [
  {
    title: projects.reports.title, category: projects.reports.category,
    summary: projects.reports.summary,
    details: projects.reports.details,
    stack: ['Nuxt 3', 'Pinia', 'Vuetify', 'FastAPI'],
    images: [illustration(projects.reports.illustrationTitle, 'overview', '#3d91a5'), illustration(projects.reports.illustrationTitle, 'detail', '#3d91a5')],
  },
  {
    title: projects.shop.title, category: projects.shop.category,
    summary: projects.shop.summary,
    details: projects.shop.details,
    stack: ['Nuxt 3', 'Pinia', 'Tailwind', 'Django REST API'],
    images: [illustration(projects.shop.title, 'overview', '#8d78b8'), illustration(projects.shop.title, 'detail', '#8d78b8')],
  },
  {
    title: projects.dtdp.title, category: projects.dtdp.category, visibleInPortfolio: true,
    summary: projects.dtdp.summary,
    details: projects.dtdp.details,
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Pinia', 'VeeValidate', 'Zod', 'PostCSS', 'Orval', 'REST API'],
    links: [{ label: projects.dtdp.link, href: '/library/dtdp', internal: true }],
    images: [
      { src: withBase('/portfolio/dtdp/1.png'), ...projects.dtdp.images[0] },
      { src: withBase('/portfolio/dtdp/2.png'), ...projects.dtdp.images[1] },
      { src: withBase('/portfolio/dtdp/3.png'), ...projects.dtdp.images[2] },
      { src: withBase('/portfolio/dtdp/4.png'), ...projects.dtdp.images[3] },
    ],
  },
  {
    title: projects.realEstate.title, category: projects.realEstate.category, visibleInPortfolio: true,
    summary: projects.realEstate.summary,
    details: projects.realEstate.details,
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Vuetify', 'Nuxt Content', 'PostCSS'],
    links: [
      { label: projects.realEstate.openSite, href: 'https://houseclubrealestate.ru/' },
      { label: projects.realEstate.link, href: '/library/real-estate', internal: true },
    ],
    images: [
      { src: withBase('/portfolio/real_estate/1.png'), ...projects.realEstate.images[0] },
      { src: withBase('/portfolio/real_estate/2.png'), ...projects.realEstate.images[1] },
      { src: withBase('/portfolio/real_estate/3.png'), ...projects.realEstate.images[2] },
      { src: withBase('/portfolio/real_estate/4.png'), ...projects.realEstate.images[3] },
    ],
  },
  {
    title: projects.energyPassport.title, category: projects.energyPassport.category, visibleInPortfolio: true,
    summary: projects.energyPassport.summary,
    details: projects.energyPassport.details,
    stack: ['Nuxt 3', 'Vuetify', 'Django', 'Django REST Framework', 'PostgreSQL', 'python-docx'],
    images: [
      { src: withBase('/portfolio/energy_passport/1.png'), ...projects.energyPassport.images[0] },
      { src: withBase('/portfolio/energy_passport/2.png'), ...projects.energyPassport.images[1] },
      { src: withBase('/portfolio/energy_passport/3.png'), ...projects.energyPassport.images[2] },
      { src: withBase('/portfolio/energy_passport/4.png'), ...projects.energyPassport.images[3] },
    ],
  },
  {
    title: projects.catalog.title, category: projects.catalog.category,
    summary: projects.catalog.summary,
    details: projects.catalog.details,
    stack: ['WordPress', 'WooCommerce'],
    links: [{ label: projects.catalog.openSite, href: 'https://rstartrading.ae/' }, { label: projects.catalog.prototype, href: 'https://gitlab.com/IndigoShorse/catalogue' }],
    images: [illustration(projects.catalog.illustrationTitle, 'overview', '#ad815a'), illustration(projects.catalog.illustrationTitle, 'detail', '#ad815a')],
  },
  {
    title: 'Energy Passport', category: projects.diploma.category,
    summary: projects.diploma.summary,
    details: projects.diploma.details,
    stack: ['Nuxt 3', 'Django', 'python-docx'],
    links: [{ label: projects.diploma.repository, href: 'https://gitlab.com/IndigoShorse/energy-passport' }],
    images: [illustration('Energy Passport', 'overview', '#6a9a81'), illustration('Energy Passport', 'detail', '#6a9a81')],
  },
  ]
}

export const portfolio: PortfolioProject[] = getPortfolio('en')
