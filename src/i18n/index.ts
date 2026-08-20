import ru from './ru.json'

// Пока один язык; en появится как en.json + запись в dictionaries,
// дальше подключается встроенный i18n-роутинг Astro (/en/...).
export const locales = ['ru'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ru'

export type Dictionary = typeof ru

const dictionaries: Record<Locale, Dictionary> = { ru }

export function getDict(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale]
}

/** Подстановка плейсхолдеров: format('{name} UI-kit', { name: 'Med' }) */
export function format(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`))
}
