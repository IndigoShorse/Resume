import { getDict, type Locale } from '@/i18n'

export type ResumeMode = 'plain' | 'cards' | 'stepper'

export const modeValues: ResumeMode[] = ['plain', 'cards', 'stepper']

export function getModes(locale?: Locale): { value: ResumeMode; label: string }[] {
  const dict = getDict(locale).modes
  return modeValues.map((value) => ({ value, label: dict[value] }))
}
