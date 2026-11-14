import { useState, type ComponentType, type ReactNode } from 'react'
import { Heart } from 'lucide-react'
import type { ReactDemoProps, ReactKitRegistry, UiComponentMeta } from './index'
import { Badge } from '@/components/ui/forruss/data-display/badge'
import { InfoCard } from '@/components/ui/forruss/data-display/InfoCard'
import { InfoStatCard } from '@/components/ui/forruss/data-display/InfoStatCard'
import { StatTile } from '@/components/ui/forruss/data-display/StatTile'
import { Button } from '@/components/ui/forruss/core/button'
import { BirthDateInput } from '@/components/ui/forruss/forms/BirthDateInput'
import { ButtonsBlock } from '@/components/ui/forruss/forms/ButtonsBlock'
import { Input } from '@/components/ui/forruss/forms/Input'
import { Select } from '@/components/ui/forruss/forms/Select'
import { Star } from '@/components/ui/forruss/forms/Star'
import { Switch } from '@/components/ui/forruss/forms/switch'
import { ConfirmDialogHost, confirmDialog } from '@/components/ui/forruss/overlay/ConfirmDialog'
import { ModalBody, ModalFooter, ModalHeader, ModalHost, ModalShell } from '@/components/ui/forruss/overlay/ModalShell'
import { Portal } from '@/components/ui/forruss/overlay/Portal'
import { ScrollArea } from '@/components/ui/forruss/overlay/ScrollArea'

import buttonSource from '@/components/ui/forruss/core/button.tsx?raw'
import badgeSource from '@/components/ui/forruss/data-display/badge.tsx?raw'
import infoCardSource from '@/components/ui/forruss/data-display/InfoCard.tsx?raw'
import infoStatCardSource from '@/components/ui/forruss/data-display/InfoStatCard.tsx?raw'
import statTileSource from '@/components/ui/forruss/data-display/StatTile.tsx?raw'
import birthDateSource from '@/components/ui/forruss/forms/BirthDateInput.tsx?raw'
import buttonsBlockSource from '@/components/ui/forruss/forms/ButtonsBlock.tsx?raw'
import inputSource from '@/components/ui/forruss/forms/Input.tsx?raw'
import selectSource from '@/components/ui/forruss/forms/Select.tsx?raw'
import starSource from '@/components/ui/forruss/forms/Star.tsx?raw'
import switchSource from '@/components/ui/forruss/forms/switch.tsx?raw'
import confirmSource from '@/components/ui/forruss/overlay/ConfirmDialog.tsx?raw'
import modalSource from '@/components/ui/forruss/overlay/ModalShell.tsx?raw'
import portalSource from '@/components/ui/forruss/overlay/Portal.tsx?raw'
import scrollAreaSource from '@/components/ui/forruss/overlay/ScrollArea.tsx?raw'

const components: UiComponentMeta[] = [
  { slug: 'button', name: 'Button', description: 'Button with product variants, sizes, and optional slot rendering.', props: [] },
  { slug: 'badge', name: 'Badge', description: 'Compact status label with semantic visual variants.', props: [] },
  { slug: 'info-card', name: 'InfoCard', description: 'Section card for profile facts and label–value pairs.', props: [] },
  { slug: 'info-stat-card', name: 'InfoStatCard', description: 'Compact metric card for profile summaries.', props: [] },
  { slug: 'stat-tile', name: 'StatTile', description: 'Square statistic tile with icon, value, and optional label.', props: [] },
  { slug: 'birth-date-input', name: 'BirthDateInput', description: 'Accessible DD.MM.YYYY input that emits ISO dates.', props: [] },
  { slug: 'buttons-block', name: 'ButtonsBlock', description: 'Reusable cancel and confirm action footer.', props: [] },
  { slug: 'input', name: 'Input', description: 'Text input with common sizing and error state.', props: [] },
  { slug: 'select', name: 'Select', description: 'Keyboard-accessible custom select menu.', props: [] },
  { slug: 'star', name: 'Star', description: 'Small decorative star marker for form headings.', props: [] },
  { slug: 'switch', name: 'Switch', description: 'Radix-based switch control.', props: [] },
  { slug: 'confirm-dialog', name: 'ConfirmDialog', description: 'Promise-based confirmation dialog rendered through a portal.', props: [] },
  { slug: 'modal-shell', name: 'ModalShell', description: 'Animated, safe-area-aware modal frame with layered-dialog support.', props: [] },
  { slug: 'portal', name: 'Portal', description: 'Small primitive for rendering overlay content at document-body level.', props: [] },
  { slug: 'scroll-area', name: 'ScrollArea', description: 'OverlayScrollbars wrapper with brand and blue themes.', props: [] },
]

function StateDemo({ children }: { children: (value: string, setValue: (value: string) => void) => ReactNode }) {
  const [value, setValue] = useState('')
  return <>{children(value, setValue)}</>
}

const demos: Record<string, ComponentType<ReactDemoProps>> = {
  button: () => <div className="forruss-showcase flex flex-wrap gap-3"><Button variant="brand">Нравится</Button><Button variant="outline">Отмена</Button><Button variant="analysis">Анализ</Button></div>,
  badge: () => <div className="forruss-showcase flex gap-3"><Badge variant="destructive">Новое</Badge><Badge variant="secondary">Профиль</Badge><Badge variant="outline">Проверено</Badge></div>,
  'info-card': () => <div className="forruss-showcase w-full max-w-lg"><InfoCard title="О профиле" items={[{ label: 'Город', value: 'Москва' }, { label: 'Цель', value: 'Общение' }]} isFirst isLast /></div>,
  'info-stat-card': () => <div className="forruss-showcase grid w-full max-w-sm grid-cols-2 gap-3"><InfoStatCard label="Совпадение" value="86%" /><InfoStatCard label="Лайки" value="24" /></div>,
  'stat-tile': () => <div className="forruss-showcase flex w-full max-w-xs gap-3"><StatTile icon={Heart} value="12" label="Лайки" variant="red" /><StatTile icon={Heart} value="4" label="Мэтчи" variant="sky" /></div>,
  'birth-date-input': () => <StateDemo>{(value, setValue) => <div className="forruss-showcase max-w-xs"><BirthDateInput value={value} onChange={setValue} className="w-full rounded-xl border border-gray-300 px-4 py-2" /><p className="mt-2 text-sm text-gray-500">ISO: {value || '—'}</p></div>}</StateDemo>,
  'buttons-block': () => <div className="forruss-showcase max-w-sm"><ButtonsBlock onCancel={() => {}} onConfirm={() => {}} /></div>,
  input: () => <div className="forruss-showcase max-w-sm"><Input placeholder="Введите имя" size="lg" /></div>,
  select: () => <StateDemo>{(value, setValue) => <div className="forruss-showcase max-w-sm"><Select value={value} onChange={setValue} options={['Москва', 'Санкт-Петербург', 'Казань']} placeholder="Выберите город" /></div>}</StateDemo>,
  star: () => <div className="forruss-showcase"><Star /></div>,
  switch: () => { const [checked, setChecked] = useState(false); return <div className="forruss-showcase flex items-center gap-3"><Switch checked={checked} onCheckedChange={setChecked} /><span>{checked ? 'Включено' : 'Выключено'}</span></div> },
  'confirm-dialog': () => <div className="forruss-showcase"><Button variant="brand" onClick={() => void confirmDialog({ title: 'Удалить профиль?', description: 'Это действие нельзя отменить.', confirmText: 'Удалить', danger: true })}>Открыть диалог</Button><ConfirmDialogHost /></div>,
  'modal-shell': () => { const [open, setOpen] = useState(false); return <div className="forruss-showcase"><Button variant="brand" onClick={() => setOpen(true)}>Открыть модальное окно</Button><ModalHost isOpen={open}><ModalShell onClose={() => setOpen(false)} ariaLabel="Пример модального окна"><ModalHeader><h2>Совместимость</h2></ModalHeader><ModalBody><p className="text-gray-700">Каркас сохраняет безопасные отступы, анимацию и корректный порядок слоёв.</p></ModalBody><ModalFooter><Button variant="brand" onClick={() => setOpen(false)}>Готово</Button></ModalFooter></ModalShell></ModalHost></div> },
  portal: () => <div className="forruss-showcase text-sm text-gray-600">Portal — инфраструктурный компонент, используемый модальными окнами и диалогами.</div>,
  'scroll-area': () => <div className="forruss-showcase h-40 max-w-md rounded-xl border border-gray-200"><ScrollArea className="h-full p-4">{Array.from({ length: 10 }, (_, i) => <p className="mb-3 text-gray-700" key={i}>Строка прокручиваемого содержимого {i + 1}</p>)}</ScrollArea></div>,
}

const sourceMap: Record<string, string> = {
  button: buttonSource, badge: badgeSource, 'info-card': infoCardSource, 'info-stat-card': infoStatCardSource, 'stat-tile': statTileSource,
  'birth-date-input': birthDateSource, 'buttons-block': buttonsBlockSource, input: inputSource,
  select: selectSource, star: starSource, switch: switchSource, 'confirm-dialog': confirmSource, 'modal-shell': modalSource, portal: portalSource, 'scroll-area': scrollAreaSource,
}

export const forrussKit: ReactKitRegistry = {
  key: 'forruss', title: 'Russian Love UI', description: 'Reusable React UI components extracted from the Russian Love dating platform.', framework: 'react', components, sourceMap, sourceLanguage: 'tsx',
  componentMap: Object.fromEntries(components.map(({ slug }) => [slug, () => null])), demoMap: demos,
}
