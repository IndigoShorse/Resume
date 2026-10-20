import type { Component as VueComponent } from 'vue'
import type { ComponentType as ReactComponent } from 'react'
import { vueKits } from './vue'
import { reactKits } from './react'

// ---------- Абстрактная модель реестра кита ----------
// Каждый раздел UI-библиотеки (med и др.) описывается объектом KitRegistry.

export type FieldType = 'string' | 'number' | 'boolean' | 'select' | 'json'

export interface PropField {
  name: string
  type: FieldType
  default: unknown
  options?: string[]
}

export interface UiComponentMeta {
  slug: string
  name: string
  description: string
  props: PropField[]
  slotText?: string
  hasModel?: boolean
  modelDefault?: unknown
  /** Пример для компонентов со сложным управлением состоянием. */
  usageCode?: string
}

interface KitBase {
  /** Сегмент URL раздела: /library/<key> */
  key: string
  /** Название раздела в меню и заголовках */
  title: string
  /** Описание для лендинга раздела */
  description: string
  /** Манифесты компонентов (подразделы сайдбара) */
  components: UiComponentMeta[]
  /** Исходники для блока кода, по slug */
  sourceMap: Record<string, string>
}

export interface VueKitRegistry extends KitBase {
  framework: 'vue'
  componentMap: Record<string, VueComponent>
}

export interface ReactDemoProps {
  props: Record<string, unknown>
  value: unknown
  onChange: (value: unknown) => void
}

export interface ReactKitRegistry extends KitBase {
  framework: 'react'
  componentMap: Record<string, ReactComponent<any>>
  /** Необязательные сценарии для компонентов, которым недостаточно передачи props. */
  demoMap?: Record<string, ReactComponent<ReactDemoProps>>
  sourceLanguage?: 'tsx' | 'jsx'
}

export type KitRegistry = VueKitRegistry | ReactKitRegistry

// ---------- Зарегистрированные разделы ----------

export const kits: KitRegistry[] = [...vueKits, ...reactKits]

export function getKit(key: string): KitRegistry | undefined {
  return kits.find((kit) => kit.key === key)
}
