// Типы и доступ к текстовке резюме. Сам текст лежит в словарях
// src/i18n/<locale>.json — компоненты-рендереры получают его через getResume().

import { getDict, type Locale } from '@/i18n'

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

export interface ResumePerson {
  name: string
  tagline: string
  location: string
  contacts: ResumeLink[]
}

export interface ResumeData {
  person: ResumePerson
  sections: ResumeSectionData[]
}

export function getResume(locale?: Locale): ResumeData {
  return getDict(locale).resume as ResumeData
}
