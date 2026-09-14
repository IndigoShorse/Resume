// Ссылки с учётом base: на GitHub Pages сайт живёт в подкаталоге (/Resume/),
// локально base === '/'. Astro не переписывает href автоматически.
const base = import.meta.env.BASE_URL

/** Абсолютный путь внутри сайта: withBase('/ui/med') -> '/Resume/ui/med' */
export function withBase(path = '/'): string {
  const clean = `/${String(path).replace(/^\/+/, '')}`
  const prefix = base.replace(/\/+$/, '')
  return clean === '/' ? `${prefix}/` : `${prefix}${clean}`
}

/** Путь без base: для сравнения с Astro.url.pathname */
export function stripBase(pathname: string): string {
  const prefix = base.replace(/\/+$/, '')
  const rest = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
  return rest.startsWith('/') ? rest : `/${rest}`
}
