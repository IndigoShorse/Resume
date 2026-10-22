import { withBase } from '@/utils/url'

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
    title: 'DTDP — ИИ-сервис', category: 'Исследовательский проект', visibleInPortfolio: true,
    summary: 'Медицинский ИИ-сервис для анализа изображений и параметров полости рта, классификации по шкале Маллампати и оценки вероятности трудной интубации. Спроектировал интерфейс, который помогает последовательно пройти сложные сценарии сбора и проверки данных.',
    details: [
      'Разработал клиентскую часть на Nuxt 4 и TypeScript: экраны входа и регистрации, дашборд, защищённые разделы и навигацию. Для управления состоянием приложения использовал Pinia. Собрал собственный набор переиспользуемых UI-компонентов, задал дизайн-токены и предусмотрел светлую и тёмную темы.',
      'Особое внимание уделил сложным формам. Спроектировал пошаговые сценарии для данных пациента, УЗИ и проверки прогноза трудных дыхательных путей: валидация выполняется на текущем шаге, а введённые данные сохраняются при переходах.',
      'Продумал работу с медицинскими изображениями: загрузку, предпросмотр, удаление и повторный выбор файлов. В форме УЗИ пользователь последовательно добавляет шесть снимков — исходные и размеченные изображения для трёх этапов — и связанные с ними измерения.',
      'Создал экраны проверки моделей: прогноз по данным пациента с отображением класса Cormack–Lehane и уверенности модели, а также классификацию Маллампати по фото с визуализацией результата детекции.',
      'Настроил генерацию API-запросов через Orval и написал API-клиент для авторизации, передачи данных и файлов, обработки ошибок и истёкшей сессии. Также реализовал историю событий с фильтрами и пагинацией и раздел управления ключами приглашений для сотрудников.',
      'Компоненты интерфейса DTDP доступны в разделе «Библиотека», а в галерее собраны реальные экраны приложения.',
    ],
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Pinia', 'VeeValidate', 'Zod', 'PostCSS', 'Orval', 'REST API'],
    links: [{ label: 'Компоненты DTDP в библиотеке', href: '/library/dtdp', internal: true }],
    images: [
      { src: withBase('/portfolio/dtdp/1.png'), alt: 'DTDP — экран входа', caption: 'Экран входа' },
      { src: withBase('/portfolio/dtdp/2.png'), alt: 'DTDP — выбор модели для тестирования', caption: 'Выбор модели' },
      { src: withBase('/portfolio/dtdp/3.png'), alt: 'DTDP — пошаговая форма прогноза трудных дыхательных путей', caption: 'Прогноз трудных дыхательных путей' },
      { src: withBase('/portfolio/dtdp/4.png'), alt: 'DTDP — форма классификации Маллампати по фото', caption: 'Маллампати по фото' },
    ],
  },
  {
    title: 'Московский Дом Недвижимости', category: 'Лендинг агентства недвижимости', visibleInPortfolio: true,
    summary: 'Сайт под ключ для развивающегося риэлторского агентства «Московский Дом Недвижимости».',
    details: [
      'Сверстал одностраничный сайт по макету Figma на Nuxt 4 и Vue 3: адаптировал структуру и интерфейс для разных размеров экрана, собрал навигацию, шапку и подвал.',
      'Разработал тематические блоки лендинга: карточки услуг, раздел со сложными ситуациями, блок о компании и FAQ с раскрывающимися ответами.',
      'Организовал контент через Nuxt Content: тексты, карточки, навигацию и FAQ хранятся в отдельных JSON-коллекциях с типизированными схемами, поэтому содержимое можно обновлять без правок компонентов.',
      'Настроил базовые SEO-метаданные и Open Graph-разметку для публикации лендинга.',
    ],
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Vuetify', 'Nuxt Content', 'PostCSS'],
    links: [
      { label: 'Открыть сайт', href: 'https://houseclubrealestate.ru/' },
      { label: 'Компоненты МДИ в библиотеке (частично на Vuetify)', href: '/library/real-estate', internal: true },
    ],
    images: [
      { src: withBase('/portfolio/real_estate/1.png'), alt: 'Московский Дом Недвижимости — первый экран и услуги', caption: 'Первый экран и услуги' },
      { src: withBase('/portfolio/real_estate/2.png'), alt: 'Московский Дом Недвижимости — блок сложных ситуаций', caption: 'Сложные ситуации' },
      { src: withBase('/portfolio/real_estate/3.png'), alt: 'Московский Дом Недвижимости — блок о компании', caption: 'О компании' },
      { src: withBase('/portfolio/real_estate/4.png'), alt: 'Московский Дом Недвижимости — раздел с частыми вопросами', caption: 'Частые вопросы' },
    ],
  },
  {
    title: 'Цифровой энергопаспорт', category: 'Учебный fullstack-проект', visibleInPortfolio: true,
    summary: 'Сервис для подготовки энергетических паспортов: пользователь заполняет данные в веб-форме, а система формирует готовый документ Word и сохраняет сведения в реестре для последующей выгрузки.',
    details: [
      'В проекте выступил fullstack-разработчиком: разработал клиентскую часть на Nuxt 3 и Vuetify, а также серверную часть на Django и Django REST Framework.',
      'Спроектировал многошаговую форму для заполнения большого набора сведений об организации, энергопотреблении и объектах обследования. Разделил сложную структуру энергетического паспорта на понятные этапы, чтобы пользователь последовательно вносил данные.',
      'Реализовал сохранение заполненных форм в PostgreSQL и таблицу паспортов, из которой можно открыть нужную запись и выгрузить документ.',
      'На сервере настроил генерацию DOCX: данные из формы подставляются в Word-шаблон, после чего пользователь скачивает сформированный энергетический паспорт.',
      'Некоммерческий учебный проект представил на выставке в рамках конкурса «Студенческий стартап» для получения гранта.',
    ],
    stack: ['Nuxt 3', 'Vuetify', 'Django', 'Django REST Framework', 'PostgreSQL', 'python-docx'],
    images: [
      { src: withBase('/portfolio/energy_passport/1.png'), alt: 'Цифровой энергопаспорт — главная страница', caption: 'Главная страница сервиса' },
      { src: withBase('/portfolio/energy_passport/2.png'), alt: 'Цифровой энергопаспорт — многошаговая форма', caption: 'Форма заполнения энергетического паспорта' },
      { src: withBase('/portfolio/energy_passport/3.png'), alt: 'Цифровой энергопаспорт — таблица паспортов', caption: 'Реестр сохранённых паспортов' },
      { src: withBase('/portfolio/energy_passport/4.png'), alt: 'Цифровой энергопаспорт — Word-шаблон', caption: 'Шаблон формируемого Word-документа' },
    ],
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
