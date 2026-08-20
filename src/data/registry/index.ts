import type { Component } from 'vue'
import { medKit } from './med'

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
}

export interface KitRegistry {
  /** Сегмент URL раздела: /ui/<key> */
  key: string
  /** Название раздела в меню и заголовках */
  title: string
  /** Описание для лендинга раздела */
  description: string
  /** Манифесты компонентов (подразделы сайдбара) */
  components: UiComponentMeta[]
  /** Живые компоненты для витрины, по slug */
  componentMap: Record<string, Component>
  /** Исходники для блока кода, по slug */
  sourceMap: Record<string, string>
}

// ---------- Зарегистрированные разделы ----------

export const kits: KitRegistry[] = [medKit]

export function getKit(key: string): KitRegistry | undefined {
  return kits.find((kit) => kit.key === key)
}
