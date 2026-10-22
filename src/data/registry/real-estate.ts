import type { Component } from 'vue'

import ReBlock from '@/components/ui/real-estate/ReBlock.vue'
import ReButton from '@/components/ui/real-estate/ReButton.vue'
import ReCard from '@/components/ui/real-estate/ReCard.vue'
import ReCarousel from '@/components/ui/real-estate/ReCarousel.vue'
import RePanel from '@/components/ui/real-estate/RePanel.vue'
import ReRomanIndex from '@/components/ui/real-estate/ReRomanIndex.vue'
import ReTextCard from '@/components/ui/real-estate/ReTextCard.vue'

import ReBlockRaw from '@/components/ui/real-estate/ReBlock.vue?raw'
import ReButtonRaw from '@/components/ui/real-estate/ReButton.vue?raw'
import ReCardRaw from '@/components/ui/real-estate/ReCard.vue?raw'
import ReCarouselRaw from '@/components/ui/real-estate/ReCarousel.vue?raw'
import RePanelRaw from '@/components/ui/real-estate/RePanel.vue?raw'
import ReRomanIndexRaw from '@/components/ui/real-estate/ReRomanIndex.vue?raw'
import ReTextCardRaw from '@/components/ui/real-estate/ReTextCard.vue?raw'
import type { UiComponentMeta, VueKitRegistry } from './index'

const components: UiComponentMeta[] = [
  {
    slug: 'block', name: 'ReBlock',
    description: 'Контейнер секции с заголовком, цветовой схемой и содержимым.',
    props: [
      { name: 'title', type: 'string', default: 'Наши услуги' },
      { name: 'headingTag', type: 'select', default: 'h2', options: ['h2', 'h3'] },
      { name: 'color', type: 'string', default: '#fff' },
      { name: 'background', type: 'string', default: '#1a1817' },
      { name: 'padding', type: 'string', default: '32px 24px' },
    ],
    slotText: 'Содержимое секции',
  },
  {
    slug: 'button', name: 'ReButton',
    description: 'Кнопка действия в фирменной тёмной палитре лендинга.',
    props: [
      { name: 'label', type: 'string', default: 'Оставить заявку' },
      { name: 'color', type: 'select', default: 'primary', options: ['primary', 'secondary', 'plain'] },
      { name: 'as', type: 'select', default: 'button', options: ['button', 'a'] },
      { name: 'href', type: 'string', default: '#' },
      { name: 'fullWidth', type: 'boolean', default: false },
      { name: 'disabled', type: 'boolean', default: false },
      { name: 'pending', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'card', name: 'ReCard',
    description: 'Карточка услуги или преимущества с римским номером.',
    props: [
      { name: 'label', type: 'string', default: 'Честная цена' },
      { name: 'index', type: 'number', default: 1 },
      { name: 'width', type: 'string', default: '100%' },
      { name: 'background', type: 'string', default: '#1e1e1e' },
    ],
    slotText: 'Оцениваем объект по рынку и фиксируем условия в договоре.',
  },
  {
    slug: 'text-card', name: 'ReTextCard',
    description: 'Текстовая карточка для сценариев и сложных ситуаций.',
    props: [
      { name: 'label', type: 'string', default: 'Недвижимость под арестом' },
      { name: 'index', type: 'number', default: 1 },
      { name: 'align', type: 'select', default: 'left', options: ['left', 'center', 'right'] },
    ],
    slotText: 'Разберём ситуацию и предложим рабочий сценарий.',
  },
  {
    slug: 'roman-index', name: 'ReRomanIndex',
    description: 'Нумерация римскими цифрами для акцентов в карточках и FAQ.',
    props: [
      { name: 'value', type: 'number', default: 4 },
      { name: 'size', type: 'select', default: 'large', options: ['default', 'large', 'xl'] },
    ],
  },
  {
    slug: 'panel', name: 'RePanel',
    description: 'Раскрывающаяся панель FAQ, построенная на Vuetify Expansion Panels.',
    props: [
      { name: 'title', type: 'string', default: 'За счёт каких средств происходит выкуп?' },
      { name: 'index', type: 'number', default: 1 },
      { name: 'open', type: 'boolean', default: false },
    ],
    slotText: 'Сделка финансируется за счёт собственного капитала агентства.',
  },
  {
    slug: 'carousel', name: 'ReCarousel',
    description: 'Карусель групп карточек на базе Vuetify Carousel.',
    props: [
      { name: 'items', type: 'json', default: ['Продажа', 'Аренда', 'Флиппинг', 'Срочный выкуп'] },
      { name: 'perSlide', type: 'number', default: 2 },
      { name: 'color', type: 'string', default: 'transparent' },
    ],
  },
]

const componentMap: Record<string, Component> = {
  block: ReBlock,
  button: ReButton,
  card: ReCard,
  'text-card': ReTextCard,
  'roman-index': ReRomanIndex,
  panel: RePanel,
  carousel: ReCarousel,
}

const sourceMap: Record<string, string> = {
  block: ReBlockRaw,
  button: ReButtonRaw,
  card: ReCardRaw,
  'text-card': ReTextCardRaw,
  'roman-index': ReRomanIndexRaw,
  panel: RePanelRaw,
  carousel: ReCarouselRaw,
}

export const realEstateKit: VueKitRegistry = {
  key: 'real-estate',
  framework: 'vue',
  title: 'МДИ (Nuxt 4)',
  description: 'Компоненты сайта «Московский Дом Недвижимости»: фирменные карточки, кнопки, FAQ и карусель на Vuetify.',
  components,
  componentMap,
  sourceMap,
}
