// Единственный источник текстовки резюме (перенесено из СурковДГ_ru.tex).
// Компоненты-рендереры получают эти данные и отображают их
// разными разделами UI-библиотеки — текст здесь не дублируется.

export interface ResumeLink {
  label: string
  href: string
}

export interface ResumeBlock {
  /** Короткая подпись для табов степпера */
  label?: string
  /** Должность / название проекта / язык */
  heading?: string
  /** Компания / стек */
  subheading?: string
  /** Период · город и т.п. */
  meta?: string
  /** Абзац текста */
  text?: string
  /** Буллеты */
  items?: string[]
  /** Теги-технологии */
  tags?: string[]
  /** Ссылки */
  links?: ResumeLink[]
  /** Уровень 1–5 (для языков) */
  level?: number
}

export interface ResumeSectionData {
  id: string
  title: string
  blocks: ResumeBlock[]
}

export const person = {
  name: 'Сурков Даниил Георгиевич',
  tagline: 'Frontend-разработчик (Vue / React / TypeScript)',
  location: 'Москва',
  contacts: [
    { label: '7535415@gmail.com', href: 'mailto:7535415@gmail.com' },
    { label: '+7 (968) 994-87-16', href: 'tel:+79689948716' },
    { label: 'Telegram @indigoshorse', href: 'https://t.me/indigoshorse' },
    { label: 'GitLab @IndigoShorse', href: 'https://gitlab.com/IndigoShorse' },
    { label: 'GitHub @IndigoShorse', href: 'https://github.com/IndigoShorse' },
  ] satisfies ResumeLink[],
}

export const sections: ResumeSectionData[] = [
  {
    id: 'profile',
    title: 'Профиль',
    blocks: [
      {
        label: 'Обо мне',
        text:
          'Frontend-разработчик с 2+ годами коммерческого опыта и более чем 5 годами практики разработки. ' +
          'Разрабатываю веб-приложения на Nuxt 3/4 и React с использованием Pinia и Axios/Fetch API. ' +
          'Генерирую API-клиенты с помощью Orval и собственных адаптеров. ' +
          'Работаю с Vuetify, Ant Design и Tailwind CSS. ' +
          'Проектирую клиентскую архитектуру и интеграцию с REST API. ' +
          'Имею опыт fullstack-разработки (Nuxt 3/4 + FastAPI / Django).',
      },
    ],
  },
  {
    id: 'experience',
    title: 'Опыт работы',
    blocks: [
      {
        label: 'ЦСЭ',
        heading: 'Fullstack-разработчик',
        subheading: 'ООО «Центр сертификации энергосбережения»',
        meta: 'Дек 2023 — настоящее время · Москва',
        items: [
          'Провёл рефакторинг легаси-кода, оптимизировал архитектуру и использование памяти: повысил производительность интерфейса веб-приложения на 30 % и сократил время разработки новых функций примерно на 40 %.',
          'Разработал ряд функций в основной системе, включая выпуск сертификатов (React + Axios + Ant Design + Python FastAPI).',
          'Автоматизировал документооборот во внутреннем сервисе и ускорил выпуск сертификатов на 90 % (Nuxt 3 + Pinia + FastAPI).',
          'Разработал сервис-расширение для формирования отчётов и сертификатов (FastAPI).',
        ],
      },
      {
        label: 'Russian Love',
        heading: 'Frontend-разработчик',
        subheading: 'Russian Love (dev.forruss.ru)',
        meta: 'Июн 2026 — настоящее время · Москва',
        items: [
          'Участвую в разработке и рефакторинге социальной сети для знакомств на React/TypeScript.',
          'Выполнил крупный рефакторинг главного приложения: выделил доменные хуки и UI-компоненты, повысил читаемость и переиспользуемость кода.',
          'Улучшил backoffice: фильтрацию, управление контентом, пользовательские сценарии и новые функциональные блоки.',
          'Работал над UX и исправлениями веб-интерфейса, включая футер, навигацию и главную страницу приложения.',
        ],
      },
      {
        label: 'Xoxlov Store',
        heading: 'Frontend-разработчик',
        subheading: 'Xoxlov Store',
        meta: 'Сен 2022 — Авг 2023 · Москва',
        items: [
          'Разрабатывал интернет-магазин на Nuxt 3, Pinia и Bulma CSS.',
          'Создал ряд экранных форм и страниц каталога.',
          'Интегрировал приложение с Django REST API.',
        ],
      },
      {
        label: 'Навигатор Сервис',
        heading: 'Системный администратор',
        subheading: 'ООО «Навигатор Сервис»',
        meta: 'Окт 2020 — Фев 2023 · Химки',
        items: [
          'Внедрил автоматическое резервное копирование локального сервера (Ubuntu, Samba).',
          'Поддерживал инфраструктуру и консультировал сотрудников.',
          'Настроил и подключил IP-телефонию.',
        ],
      },
    ],
  },
  {
    id: 'skills',
    title: 'Технологии',
    blocks: [
      {
        label: 'Стек',
        tags: [
          'JavaScript', 'TypeScript', 'Python', 'Nuxt 3', 'React', 'Pinia',
          'Tailwind', 'Ant Design', 'Webpack', 'REST API', 'Git', 'Vite',
          'FastAPI', 'Django',
        ],
      },
    ],
  },
  {
    id: 'projects',
    title: 'Проекты',
    blocks: [
      {
        label: 'Отчёты',
        heading: 'Сервис генерации отчётов',
        subheading: 'Nuxt 3 + Pinia + Vuetify + FastAPI',
      },
      {
        label: 'Магазин',
        heading: 'Интернет-магазин',
        subheading: 'Nuxt 3 + Pinia + Tailwind',
      },
      {
        label: 'НИР',
        heading: 'НИР (ИИ-анализ УЗИ)',
        subheading: 'Nuxt 3 + Pinia + Vuetify',
      },
      {
        label: 'Каталог',
        heading: 'Каталог',
        subheading: 'WordPress + WooCommerce',
        links: [
          { label: 'rstartrading.ae', href: 'https://rstartrading.ae/' },
          { label: 'Прототип на GitLab', href: 'https://gitlab.com/IndigoShorse/catalogue' },
        ],
      },
      {
        label: 'Диплом',
        heading: 'Веб-приложение для дипломного проекта заказчика',
        subheading: 'Nuxt 3 + Django + python-docx',
        links: [
          { label: 'energy-passport на GitLab', href: 'https://gitlab.com/IndigoShorse/energy-passport' },
        ],
      },
    ],
  },
  {
    id: 'education',
    title: 'Образование',
    blocks: [
      {
        label: 'Дубна',
        heading: 'Программная инженерия',
        subheading: 'Университет «Дубна»',
        meta: '2029 · Заочная форма',
      },
    ],
  },
  {
    id: 'languages',
    title: 'Языки',
    blocks: [
      { label: 'Русский', heading: 'Русский', level: 5 },
      { label: 'Английский', heading: 'Английский (B2)', level: 4 },
    ],
  },
]
