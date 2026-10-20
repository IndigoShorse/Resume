import type { ReactKitRegistry } from './index'

// Новые React-разделы регистрируются здесь; маршруты библиотеки создаются из kits.
export const reactKits: ReactKitRegistry[] = []

export function getReactKit(key: string): ReactKitRegistry | undefined {
  return reactKits.find((kit) => kit.key === key)
}
