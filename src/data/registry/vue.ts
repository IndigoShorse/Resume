import { medKit } from './med'
import { realEstateKit } from './real-estate'
import type { VueKitRegistry } from './index'

export const vueKits: VueKitRegistry[] = [medKit, realEstateKit]

export function getVueKit(key: string): VueKitRegistry | undefined {
  return vueKits.find((kit) => kit.key === key)
}
