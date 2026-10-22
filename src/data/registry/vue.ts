import { getMedKit, medKit } from './med'
import { getRealEstateKit, realEstateKit } from './real-estate'
import type { VueKitRegistry } from './index'
import type { Locale } from '@/i18n'

export const vueKits: VueKitRegistry[] = [medKit, realEstateKit]

export function getVueKits(locale: Locale): VueKitRegistry[] {
  return [getMedKit(locale), getRealEstateKit(locale)]
}

export function getVueKit(key: string, locale: Locale = 'en'): VueKitRegistry | undefined {
  return getVueKits(locale).find((kit) => kit.key === key)
}
