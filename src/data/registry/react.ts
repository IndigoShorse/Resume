import type { ReactKitRegistry } from './index'
import { forrussKit } from './forruss'

// Новые React-разделы регистрируются здесь; маршруты библиотеки создаются из kits.
export const reactKits: ReactKitRegistry[] = [forrussKit]

export function getReactKit(key: string): ReactKitRegistry | undefined {
  return reactKits.find((kit) => kit.key === key)
}
