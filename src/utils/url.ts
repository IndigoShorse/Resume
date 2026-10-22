import type { Locale } from '@/i18n'

// Ссылки с учётом base: на GitHub Pages сайт живёт в подкаталоге (/Resume/),
// локально base === '/'. Astro не переписывает href автоматически.
const base = import.meta.env.BASE_URL

/** Абсолютный путь внутри сайта: withBase('/library/dtdp') -> '/Resume/library/dtdp' */
export function withBase(path = '/'): string {
  const clean = `/${String(path).replace(/^\/+/, '')}`
  const prefix = base.replace(/\/+$/, '')
  return clean === '/' ? `${prefix}/` : `${prefix}${clean}`
}

/** Локализованный путь: английский — в корне, русский — с префиксом /ru. */
export function withLocale(path: string, locale: Locale): string {
  const normalizedPath = path === '/' ? '' : path
  return withBase(locale === 'ru' ? `/ru${normalizedPath}` : normalizedPath || '/')
}

/** Путь без base: для сравнения с Astro.url.pathname */
export function stripBase(pathname: string): string {
  const prefix = base.replace(/\/+$/, '')
  const rest = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
  return rest.startsWith('/') ? rest : `/${rest}`
}
