export interface PortfolioImage {
  src: string
  alt: string
}

export interface PortfolioProject {
  title: string
  category: string
  summary: string
  details: string[]
  stack: string[]
  links?: { label: string; href: string; internal?: boolean }[]
  images: PortfolioImage[]
}

// Иллюстрации показывают компоновку, а не реальные экраны закрытых проектов.
function illustration(title: string, variant: 'overview' | 'detail', accent: string): PortfolioImage {
  const detail = variant === 'detail'
  const label = detail ? 'Детальный экран' : 'Общий вид'
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
    <text x="320" y="224" fill="#728392" font-size="16" font-family="Arial, sans-serif">${label} · схема интерфейса</text>
    ${detail
      ? `<rect x="320" y="265" width="760" height="74" rx="12" fill="#f3f7f9"/><rect x="344" y="288" width="230" height="12" rx="6" fill="#bdcbd5"/><rect x="344" y="312" width="380" height="8" rx="4" fill="#d9e3e9"/><rect x="320" y="365" width="760" height="255" rx="12" fill="#f7fafb" stroke="#e2e9ee"/><rect x="350" y="396" width="300" height="13" rx="6" fill="${accent}"/><rect x="350" y="435" width="675" height="9" rx="4" fill="#d9e3e9"/><rect x="350" y="463" width="600" height="9" rx="4" fill="#d9e3e9"/><rect x="350" y="491" width="640" height="9" rx="4" fill="#d9e3e9"/><rect x="350" y="552" width="150" height="38" rx="8" fill="${accent}"/>`
      : `<rect x="320" y="265" width="760" height="120" rx="12" fill="${accent}" opacity=".16"/><rect x="345" y="293" width="245" height="13" rx="6" fill="${accent}"/><rect x="345" y="324" width="380" height="9" rx="4" fill="#aebdc8"/><rect x="320" y="412" width="238" height="208" rx="12" fill="#f3f7f9"/><rect x="581" y="412" width="238" height="208" rx="12" fill="#f3f7f9"/><rect x="842" y="412" width="238" height="208" rx="12" fill="#f3f7f9"/><rect x="345" y="442" width="120" height="11" rx="5" fill="${accent}"/><rect x="606" y="442" width="120" height="11" rx="5" fill="${accent}"/><rect x="867" y="442" width="120" height="11" rx="5" fill="${accent}"/>`}
    <text x="1068" y="662" text-anchor="end" fill="#8999a5" font-size="13" font-family="Arial, sans-serif">ИЛЛЮСТРАЦИЯ</text>
  </svg>`
  return { src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, alt: `${title} — ${label.toLowerCase()}, иллюстративная схема` }
}

export const portfolio: PortfolioProject[] = [
  {
    title: 'Сервис генерации отчётов', category: 'Веб-приложение',
    summary: 'Интерфейс для подготовки отчётов и документов.',
    details: ['Разработка клиентской части на Nuxt 3 с управлением состоянием через Pinia и интерфейсом на Vuetify.', 'Серверная часть проекта использует FastAPI.'],
    stack: ['Nuxt 3', 'Pinia', 'Vuetify', 'FastAPI'],
    images: [illustration('Сервис отчётов', 'overview', '#3d91a5'), illustration('Сервис отчётов', 'detail', '#3d91a5')],
  },
  {
    title: 'Интернет-магазин', category: 'E-commerce',
    summary: 'Каталог и экранные формы интернет-магазина.',
    details: ['Разработка страниц каталога и экранных форм на Nuxt 3 и Pinia.', 'Интеграция клиентского приложения с Django REST API.'],
    stack: ['Nuxt 3', 'Pinia', 'Tailwind', 'Django REST API'],
    images: [illustration('Интернет-магазин', 'overview', '#8d78b8'), illustration('Интернет-магазин', 'detail', '#8d78b8')],
  },
  {
    title: 'DTDP — медицинский ИИ-сервис', category: 'Исследовательский проект',
    summary: 'Разработал новую версию фронтенда внутреннего инструмента для анестезиологов: сбор данных для обучения ИИ и проверка медицинских моделей.',
    details: [
      'Полностью разработал фронтенд на Nuxt 4, Vue 3 и TypeScript: экраны входа и регистрации, дашборд, защищённые разделы, навигацию и собственный набор переиспользуемых UI-компонентов. Оформил интерфейс с дизайн-токенами и переключением светлой и тёмной темы.',
      'Сделал пошаговые формы для сбора данных пациента, УЗИ и проверки прогноза трудных дыхательных путей. Проверка полей выполняется на текущем шаге через vee-validate и Zod, при переходах введённые значения сохраняются.',
      'Реализовал загрузку медицинских изображений с предпросмотром, удалением и повторным выбором. Форма УЗИ принимает шесть снимков — по паре исходных и размеченных изображений на каждом из трёх шагов — вместе с измерениями.',
      'Создал экраны проверки моделей: прогноз по данным пациента с отображением класса Cormack–Lehane и уверенности модели, а также классификацию Маллампати по фото с визуализацией результата детекции.',
      'Настроил Orval для генерации API-запросов и проводил их через написанный мной API-клиент. Через него организовал авторизацию, отправку данных и файлов, обработку ошибок и истёкшей сессии. Реализовал историю событий с фильтрами и пагинацией, а также раздел управления ключами приглашений для сотрудников.',
      'Компоненты интерфейса DTDP можно изучить в разделе «Библиотека». Изображения в этой карточке пока являются иллюстративными схемами, а не скриншотами приложения.',
    ],
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Pinia', 'VeeValidate', 'Zod', 'PostCSS', 'Orval', 'REST API'],
    links: [{ label: 'Компоненты DTDP в библиотеке', href: '/library/dtdp', internal: true }],
    images: [illustration('DTDP', 'overview', '#5e92b1'), illustration('DTDP', 'detail', '#5e92b1')],
  },
  {
    title: 'Каталог Rstar Trading', category: 'Публичный сайт',
    summary: 'Каталог на WordPress и WooCommerce.',
    details: ['Публичный сайт каталога и прототип проекта доступны по ссылкам ниже.'],
    stack: ['WordPress', 'WooCommerce'],
    links: [{ label: 'Открыть сайт', href: 'https://rstartrading.ae/' }, { label: 'Прототип на GitLab', href: 'https://gitlab.com/IndigoShorse/catalogue' }],
    images: [illustration('Каталог', 'overview', '#ad815a'), illustration('Каталог', 'detail', '#ad815a')],
  },
  {
    title: 'Energy Passport', category: 'Дипломный проект',
    summary: 'Веб-приложение для дипломного проекта заказчика.',
    details: ['Клиентская часть построена на Nuxt 3, серверная — на Django.', 'Для работы с документами используется python-docx.'],
    stack: ['Nuxt 3', 'Django', 'python-docx'],
    links: [{ label: 'Репозиторий на GitLab', href: 'https://gitlab.com/IndigoShorse/energy-passport' }],
    images: [illustration('Energy Passport', 'overview', '#6a9a81'), illustration('Energy Passport', 'detail', '#6a9a81')],
  },
]
