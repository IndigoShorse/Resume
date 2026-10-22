import { useState } from 'react'
import { getReactKit } from '@/data/registry/react'
import type { PropField } from '@/data/registry'
import { getDict } from '@/i18n'

interface Props {
  kit: string
  slug: string
}

function defaults(fields: PropField[]): Record<string, unknown> {
  return Object.fromEntries(fields.map(({ name, default: value }) => [name, structuredClone(value ?? null)]))
}

function drafts(fields: PropField[], state: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(fields.filter((field) => field.type === 'json').map((field) => [field.name, JSON.stringify(state[field.name], null, 2)]))
}

function jsxValue(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value)
  return `{${JSON.stringify(value)}}`
}

function validJson(value: string): boolean {
  try { JSON.parse(value); return true } catch { return false }
}

function usageCode(name: string, fields: PropField[], state: Record<string, unknown>, children?: string): string {
  const attributes = fields.flatMap((field) => {
    const value = state[field.name]
    if (JSON.stringify(value) === JSON.stringify(field.default ?? null)) return []
    return [value === true ? field.name : `${field.name}=${jsxValue(value)}`]
  })
  const opening = `<${name}${attributes.length ? ` ${attributes.join(' ')}` : ''}`
  return children ? `${opening}>${children}</${name}>` : `${opening} />`
}

export default function ReactShowcase({ kit: key, slug }: Props) {
  const kit = getReactKit(key)
  if (!kit) throw new Error(`React kit not found: ${key}`)
  const item = kit.components.find((entry) => entry.slug === slug)
  if (!item) throw new Error(`Component not found: ${key}/${slug}`)
  const meta = item
  const Preview = kit.componentMap[slug]
  if (!Preview) throw new Error(`Preview not found: ${key}/${slug}`)
  const Demo = kit.demoMap?.[slug]
  const dict = getDict().showcase

  const [state, setState] = useState<Record<string, unknown>>(() => defaults(meta.props))
  const [jsonDrafts, setJsonDrafts] = useState<Record<string, string>>(() => drafts(meta.props, defaults(meta.props)))
  const [value, setValue] = useState<unknown>(meta.modelDefault ?? null)
  const [children, setChildren] = useState(meta.slotText ?? '')
  const [copied, setCopied] = useState(false)
  const example = meta.usageCode ?? usageCode(meta.name, meta.props, state, meta.slotText === undefined ? undefined : children)

  function update(name: string, next: unknown) {
    setState((previous) => ({ ...previous, [name]: next }))
  }

  function updateJson(name: string, text: string) {
    setJsonDrafts((previous) => ({ ...previous, [name]: text }))
    try { update(name, JSON.parse(text)) } catch { /* Preserve the last valid value. */ }
  }

  function reset() {
    const next = defaults(meta.props)
    setState(next)
    setJsonDrafts(drafts(meta.props, next))
    setValue(meta.modelDefault ?? null)
    setChildren(meta.slotText ?? '')
  }

  async function copy() {
    await navigator.clipboard.writeText(example)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return <>
    <div className="showcase">
      <div className="showcase__preview">
        {Demo
          ? <Demo props={state} value={value} onChange={setValue} />
          : meta.slotText === undefined ? <Preview {...state} /> : <Preview {...state}>{children}</Preview>}
      </div>

      <aside className="showcase__panel">
        <h3 className="showcase__panel-title">{dict.props}</h3>
        <div className="props-panel">
          {meta.props.map((field) => {
            const id = `prop-${key}-${slug}-${field.name}`
            const current = state[field.name]
            return <div className="props-panel__field" key={field.name}>
              <label className="props-panel__label" htmlFor={id}>{field.name}<span className="props-panel__type">{field.type}</span></label>
              {field.type === 'string' && <input id={id} className="props-panel__control" type="text" value={String(current ?? '')} onChange={(event) => update(field.name, event.target.value)} />}
              {field.type === 'number' && <input id={id} className="props-panel__control" type="number" value={current == null ? '' : Number(current)} onChange={(event) => update(field.name, event.target.value === '' ? null : Number(event.target.value))} />}
              {field.type === 'boolean' && <label className="props-panel__checkbox"><input id={id} type="checkbox" checked={Boolean(current)} onChange={(event) => update(field.name, event.target.checked)} /><span>{String(Boolean(current))}</span></label>}
              {field.type === 'select' && <select id={id} className="props-panel__control" value={String(current ?? '')} onChange={(event) => update(field.name, event.target.value)}>{field.options?.map((option) => <option value={option} key={option}>{option || '—'}</option>)}</select>}
              {field.type === 'json' && <textarea id={id} className={`props-panel__control props-panel__control--json${validJson(jsonDrafts[field.name] ?? '') ? '' : ' props-panel__control--invalid'}`} rows={6} spellCheck={false} value={jsonDrafts[field.name] ?? ''} onChange={(event) => updateJson(field.name, event.target.value)} />}
            </div>
          })}
          {!meta.props.length && <p className="props-panel__empty">{dict.noProps}</p>}
        </div>

        {meta.slotText !== undefined && <>
          <h3 className="showcase__panel-title">{dict.slot}</h3>
          <input className="showcase__slot-input" type="text" value={children} onChange={(event) => setChildren(event.target.value)} />
        </>}
        {Demo && meta.modelDefault !== undefined && <>
          <h3 className="showcase__panel-title">{dict.value}</h3>
          <code className="showcase__model-value">{JSON.stringify(value)}</code>
        </>}
        <button className="showcase__reset" type="button" onClick={reset}>{dict.reset}</button>
      </aside>
    </div>

    <details className="code-block code-block--usage" open>
      <summary className="code-block__summary">{dict.viewCode}</summary>
      <div className="code-block__body">
        <button className="code-block__copy" type="button" onClick={copy}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          {copied ? dict.copied : dict.copy}
        </button>
        <pre><code>{example}</code></pre>
      </div>
    </details>
  </>
}
