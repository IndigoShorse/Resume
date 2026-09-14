import { getDict, type Locale } from '@/i18n'

export type ResumeMode = 'plain' | 'cards' | 'carousel'

export const modeValues: ResumeMode[] = ['plain', 'cards', 'carousel']

export function getModes(locale?: Locale): { value: ResumeMode; label: string }[] {
  const dict = getDict(locale).modes
  return modeValues.map((value) => ({ value, label: dict[value] }))
}
