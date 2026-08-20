export type ResumeMode = 'plain' | 'cards' | 'stepper'

export const modes: { value: ResumeMode; label: string }[] = [
  { value: 'plain', label: 'Типографика' },
  { value: 'cards', label: 'Карточки' },
  { value: 'stepper', label: 'Степпер' },
]
