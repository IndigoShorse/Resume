import { medKit } from './med'
import type { VueKitRegistry } from './index'

export const vueKits: VueKitRegistry[] = [medKit]

export function getVueKit(key: string): VueKitRegistry | undefined {
  return vueKits.find((kit) => kit.key === key)
}
