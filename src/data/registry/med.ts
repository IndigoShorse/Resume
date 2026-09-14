import type { Component } from 'vue'

import UiAlert from '@/components/ui/med/UiAlert.vue'
import UiBack from '@/components/ui/med/UiBack.vue'
import UiBreadcrumbs from '@/components/ui/med/UiBreadcrumbs.vue'
import UiButton from '@/components/ui/med/UiButton.vue'
import UiCard from '@/components/ui/med/UiCard.vue'
import UiContainer from '@/components/ui/med/UiContainer.vue'
import UiDivider from '@/components/ui/med/UiDivider.vue'
import UiForm from '@/components/ui/med/UiForm.vue'
import UiIcon from '@/components/ui/med/UiIcon.vue'
import UiInput from '@/components/ui/med/UiInput.vue'
import UiInputImage from '@/components/ui/med/UiInputImage.vue'
import UiLayoutContainer from '@/components/ui/med/UiLayoutContainer.vue'
import UiModal from '@/components/ui/med/UiModal.vue'
import UiCarousel from '@/components/ui/med/UiCarousel.vue'
import UiStepperForm from '@/components/ui/med/UiStepperForm.vue'

import UiAlertRaw from '@/components/ui/med/UiAlert.vue?raw'
import UiBackRaw from '@/components/ui/med/UiBack.vue?raw'
import UiBreadcrumbsRaw from '@/components/ui/med/UiBreadcrumbs.vue?raw'
import UiButtonRaw from '@/components/ui/med/UiButton.vue?raw'
import UiCardRaw from '@/components/ui/med/UiCard.vue?raw'
import UiContainerRaw from '@/components/ui/med/UiContainer.vue?raw'
import UiDividerRaw from '@/components/ui/med/UiDivider.vue?raw'
import UiFormRaw from '@/components/ui/med/UiForm.vue?raw'
import UiIconRaw from '@/components/ui/med/UiIcon.vue?raw'
import UiInputRaw from '@/components/ui/med/UiInput.vue?raw'
import UiInputImageRaw from '@/components/ui/med/UiInputImage.vue?raw'
import UiLayoutContainerRaw from '@/components/ui/med/UiLayoutContainer.vue?raw'
import UiModalRaw from '@/components/ui/med/UiModal.vue?raw'
import UiCarouselRaw from '@/components/ui/med/UiCarousel.vue?raw'
import UiStepperFormRaw from '@/components/ui/med/UiStepperForm.vue?raw'

// Импорт только типов — в рантайме цикла index <-> med нет
import type { KitRegistry, UiComponentMeta } from './index'
import { getDict } from '@/i18n'

const iconOptions = ['arrow-right', 'arrow-up-right', 'minus', 'triangle-alert']

// Раздел Med: Vue-кит, перенесённый из Nuxt 3 (DTDP_front)
const rawComponents: Omit<UiComponentMeta, 'description'>[] = [
  {
    slug: 'button',
    name: 'UiButton',
    props: [
      { name: 'label', type: 'string', default: 'Кнопка' },
      { name: 'color', type: 'select', default: 'primary', options: ['primary', 'secondary', 'plain'] },
      { name: 'as', type: 'select', default: 'button', options: ['button', 'a', 'nuxt-link'] },
      { name: 'to', type: 'string', default: '' },
      { name: 'appendIcon', type: 'select', default: '', options: ['', ...iconOptions] },
      { name: 'fullWidth', type: 'boolean', default: false },
      { name: 'hasMargin', type: 'boolean', default: false },
      { name: 'disabled', type: 'boolean', default: false },
      { name: 'pending', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'input',
    name: 'UiInput',
    props: [
      { name: 'as', type: 'select', default: 'input', options: ['input', 'select', 'textarea'] },
      { name: 'error', type: 'string', default: '' },
      { name: 'type', type: 'select', default: 'text', options: ['text', 'number', 'email', 'password', 'tel'] },
      { name: 'label', type: 'string', default: 'Имя' },
      { name: 'placeholder', type: 'string', default: 'Введите текст' },
      {
        name: 'options', type: 'json',
        default: [
          { label: 'Первый', value: 1 },
          { label: 'Второй', value: 2 },
          { label: 'Третий', value: 3, disabled: true },
        ],
      },
      { name: 'fullWidth', type: 'boolean', default: false },
      { name: 'hasMargin', type: 'boolean', default: false },
      { name: 'disabled', type: 'boolean', default: false },
      { name: 'labelBold', type: 'boolean', default: false },
    ],
    hasModel: true,
    modelDefault: '',
  },
  {
    slug: 'input-image',
    name: 'UiInputImage',
    props: [
      { name: 'label', type: 'string', default: 'Фото профиля' },
      { name: 'placeholder', type: 'string', default: 'Загрузить фото' },
      { name: 'accept', type: 'string', default: 'image/png, image/jpeg, image/jpg' },
      { name: 'disabled', type: 'boolean', default: false },
    ],
  },
  {
    slug: 'form',
    name: 'UiForm',
    props: [
      { name: 'title', type: 'string', default: 'Регистрация' },
      { name: 'subtitle', type: 'string', default: 'Заполните поля ниже' },
      { name: 'titleAlign', type: 'select', default: 'left', options: ['left', 'center', 'right'] },
      { name: 'confirmTitle', type: 'string', default: 'Отправить' },
      { name: 'cancelTitle', type: 'string', default: 'Отмена' },
      { name: 'btnsDirection', type: 'select', default: 'row', options: ['row', 'column'] },
      { name: 'btnsAlign', type: 'select', default: 'end', options: ['start', 'center', 'end'] },
      { name: 'btnsFullWidth', type: 'boolean', default: false },
      { name: 'hideConfirm', type: 'boolean', default: false },
      { name: 'btnLoading', type: 'boolean', default: false },
      { name: 'width', type: 'number', default: 400 },
      { name: 'gap', type: 'number', default: 24 },
      { name: 'error', type: 'string', default: '' },
    ],
  },
  {
    slug: 'stepper-form',
    name: 'UiStepperForm',
    props: [
      { name: 'title', type: 'string', default: 'Шаг 1' },
      { name: 'subtitle', type: 'string', default: 'Данные шага' },
      { name: 'confirmTitle', type: 'string', default: 'Далее' },
      { name: 'cancelTitle', type: 'string', default: 'Назад' },
      { name: 'btnsDirection', type: 'select', default: 'row', options: ['row', 'column'] },
      { name: 'btnsAlign', type: 'select', default: 'end', options: ['start', 'center', 'end'] },
      { name: 'btnsFullWidth', type: 'boolean', default: false },
      { name: 'hideConfirm', type: 'boolean', default: false },
      { name: 'width', type: 'number', default: 400 },
      { name: 'gap', type: 'number', default: 24 },
    ],
    slotText: 'Содержимое шага',
  },
  {
    slug: 'carousel',
    name: 'UiCarousel',
    props: [
      {
        name: 'steps', type: 'json',
        default: [{ label: 'Профиль' }, { label: 'Документы' }, { label: 'Готово' }],
      },
      { name: 'headerClickable', type: 'boolean', default: true },
      { name: 'showNavButtons', type: 'boolean', default: true },
      { name: 'prevLabel', type: 'string', default: 'Назад' },
      { name: 'nextLabel', type: 'string', default: 'Далее' },
      { name: 'width', type: 'number', default: 500 },
      { name: 'contentHeight', type: 'number', default: 665 },
    ],
    hasModel: true,
    modelDefault: 0,
  },
  {
    slug: 'modal',
    name: 'UiModal',
    props: [
      { name: 'title', type: 'string', default: 'Удалить запись?' },
      { name: 'subtitle', type: 'string', default: 'Это действие нельзя отменить' },
      { name: 'confirmTitle', type: 'string', default: 'Подтвердить' },
    ],
    hasModel: true,
    modelDefault: false,
  },
  {
    slug: 'card',
    name: 'UiCard',
    props: [
      { name: 'title', type: 'string', default: 'Заголовок карточки' },
      { name: 'variant', type: 'select', default: 'navigation', options: ['navigation', 'form'] },
      { name: 'width', type: 'string', default: '400px' },
      { name: 'height', type: 'string', default: 'auto' },
      { name: 'image', type: 'string', default: '' },
    ],
    slotText: 'Содержимое карточки',
  },
  {
    slug: 'container',
    name: 'UiContainer',
    props: [
      { name: 'variant', type: 'select', default: 'default', options: ['default', 'inset'] },
      { name: 'isRow', type: 'boolean', default: false },
      { name: 'centered', type: 'boolean', default: false },
      { name: 'marginTop', type: 'number', default: 0 },
      { name: 'width', type: 'number', default: 0 },
      { name: 'height', type: 'number', default: 0 },
    ],
    slotText: 'Контент контейнера',
  },
  {
    slug: 'layout-container',
    name: 'UiLayoutContainer',
    props: [
      { name: 'direction', type: 'select', default: 'row', options: ['row', 'col', 'grid-cols', 'grid-rows'] },
      { name: 'margin', type: 'number', default: 8 },
      { name: 'cols', type: 'number', default: 3 },
      { name: 'rows', type: 'number', default: 0 },
    ],
  },
  {
    slug: 'divider',
    name: 'UiDivider',
    props: [
      { name: 'width', type: 'string', default: '450px' },
      { name: 'marginBottom', type: 'number', default: 12 },
      { name: 'marginTop', type: 'number', default: 0 },
      { name: 'thickness', type: 'number', default: 1 },
      { name: 'color', type: 'string', default: '' },
    ],
  },
  {
    slug: 'alert',
    name: 'UiAlert',
    props: [
      { name: 'text', type: 'string', default: 'Проверьте введённые данные' },
      { name: 'variant', type: 'select', default: 'warning', options: ['warning', 'error', 'info', 'success'] },
      { name: 'hideIcon', type: 'boolean', default: false },
      { name: 'width', type: 'string', default: 'auto' },
    ],
  },
  {
    slug: 'breadcrumbs',
    name: 'UiBreadcrumbs',
    props: [
      {
        name: 'items', type: 'json',
        default: [
          { label: 'Главная', to: '#' },
          { label: 'Каталог', to: '#' },
          { label: 'Текущая страница' },
        ],
      },
      { name: 'separator', type: 'select', default: 'arrow-right', options: iconOptions },
      { name: 'separatorSize', type: 'number', default: 8 },
      { name: 'boldCurrent', type: 'boolean', default: true },
    ],
  },
  {
    slug: 'back',
    name: 'UiBack',
    props: [
      { name: 'label', type: 'string', default: 'Назад к списку' },
      { name: 'to', type: 'string', default: '#' },
      { name: 'hideIcon', type: 'boolean', default: false },
      { name: 'iconSize', type: 'number', default: 24 },
    ],
  },
  {
    slug: 'icon',
    name: 'UiIcon',
    props: [
      { name: 'icon', type: 'select', default: 'arrow-right', options: iconOptions },
      { name: 'width', type: 'string', default: '32px' },
      { name: 'height', type: 'string', default: '32px' },
      { name: 'color', type: 'string', default: '' },
    ],
  },
]

const componentMap: Record<string, Component> = {
  'button': UiButton,
  'input': UiInput,
  'input-image': UiInputImage,
  'form': UiForm,
  'stepper-form': UiStepperForm,
  'carousel': UiCarousel,
  'modal': UiModal,
  'card': UiCard,
  'container': UiContainer,
  'layout-container': UiLayoutContainer,
  'divider': UiDivider,
  'alert': UiAlert,
  'breadcrumbs': UiBreadcrumbs,
  'back': UiBack,
  'icon': UiIcon,
}

const sourceMap: Record<string, string> = {
  'button': UiButtonRaw,
  'input': UiInputRaw,
  'input-image': UiInputImageRaw,
  'form': UiFormRaw,
  'stepper-form': UiStepperFormRaw,
  'carousel': UiCarouselRaw,
  'modal': UiModalRaw,
  'card': UiCardRaw,
  'container': UiContainerRaw,
  'layout-container': UiLayoutContainerRaw,
  'divider': UiDividerRaw,
  'alert': UiAlertRaw,
  'breadcrumbs': UiBreadcrumbsRaw,
  'back': UiBackRaw,
  'icon': UiIconRaw,
}

// Тексты кита (название, описание, описания компонентов) — из словаря i18n
const kitDict = getDict().kits.med

const components: UiComponentMeta[] = rawComponents.map((meta) => ({
  ...meta,
  description: kitDict.components[meta.slug as keyof typeof kitDict.components],
}))

export const medKit: KitRegistry = {
  key: 'med',
  title: kitDict.title,
  description: kitDict.description,
  components,
  componentMap,
  sourceMap,
}
