<script setup lang="ts">
import UiButton from '@/components/ui/med/UiButton.vue'
import UiInput from '@/components/ui/med/UiInput.vue'
import { getKit } from '@/data/registry'
import { format, getDict } from '@/i18n'
import { computed, reactive, ref } from 'vue'
import PropsPanel from './PropsPanel.vue'

const props = defineProps<{ slug: string; kit?: string }>()

const kitRegistry = getKit(props.kit ?? 'med')!
const meta = kitRegistry.components.find((m) => m.slug === props.slug)!
const comp = kitRegistry.componentMap[props.slug]

const state = reactive<Record<string, any>>(
  Object.fromEntries(
    meta.props.map((p) => [p.name, JSON.parse(JSON.stringify(p.default ?? null))])
  )
)
const model = ref<any>(meta.modelDefault ?? null)
const slotText = ref(meta.slotText ?? '')

const formValues = ref<Record<string, unknown> | null>(null)

const dict = getDict().showcase

function toKebab(name: string) {
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
}

// Сниппет использования: только пропсы, изменённые пользователем в панели
const usageCode = computed(() => {
  const attrs: string[] = []
  for (const p of meta.props) {
    const value = state[p.name]
    if (JSON.stringify(value) === JSON.stringify(p.default ?? null)) continue
    const attr = toKebab(p.name)
    if (typeof value === 'boolean') {
      attrs.push(value ? attr : `:${attr}="false"`)
    } else if (typeof value === 'number') {
      attrs.push(`:${attr}="${value}"`)
    } else if (typeof value === 'string') {
      attrs.push(value.includes('"') ? `${attr}='${value}'` : `${attr}="${value}"`)
    } else if (value !== null && typeof value === 'object') {
      attrs.push(`:${attr}='${JSON.stringify(value)}'`)
    }
  }
  if (meta.hasModel) attrs.push('v-model="value"')

  const tag = meta.name
  const content = meta.slotText !== undefined ? slotText.value.trim() : ''
  const inline = attrs.length ? ` ${attrs.join(' ')}` : ''
  const singleLine = content
    ? `<${tag}${inline}>${content}</${tag}>`
    : `<${tag}${inline} />`
  if (singleLine.length <= 80) return singleLine

  const attrLines = attrs.map((a) => `    ${a}`).join('\n')
  return content
    ? `<${tag}\n${attrLines}\n>\n    ${content}\n</${tag}>`
    : `<${tag}\n${attrLines}\n/>`
})

const copied = ref(false)
async function copyUsage() {
  await navigator.clipboard.writeText(usageCode.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

// Ключ панели: смена пересоздаёт PropsPanel, чтобы json-черновики перечитали state
const panelKey = ref(0)
function resetProps() {
  for (const p of meta.props) {
    state[p.name] = JSON.parse(JSON.stringify(p.default ?? null))
  }
  model.value = meta.modelDefault ?? null
  slotText.value = meta.slotText ?? ''
  formValues.value = null
  panelKey.value++
}
</script>

<template>
  <div class="showcase">
    <div class="showcase__preview">
      <!-- UiModal: нужен триггер открытия -->
      <template v-if="slug === 'modal'">
        <UiButton :label="dict.openModal" @click="model = true" />
        <component :is="comp" v-bind="state" v-model="model" @confirm-action="model = false" />
      </template>

      <!-- UiCarousel: слайды рендерятся по слотам step-N -->
      <template v-else-if="slug === 'carousel'">
        <component :is="comp" :key="JSON.stringify(state.steps)" v-bind="state" v-model="model">
          <template v-for="(step, i) in state.steps" :key="i" #[`step-${i}`]>
            <div class="showcase__demo-step">
              <h4>{{ step.label }}</h4>
              <p>{{ format(dict.stepContent, { n: i + 1 }) }}</p>
            </div>
          </template>
        </component>
      </template>

      <!-- UiForm: демо-поля внутри формы -->
      <template v-else-if="slug === 'form'">
        <component :is="comp" v-bind="state" @submit="(values: any) => (formValues = values)"
          @cancel="formValues = null">
          <UiInput name="name" label="Имя" placeholder="Иван" full-width />
          <UiInput name="email" type="email" label="E-mail" placeholder="ivan@example.com" full-width />
        </component>
        <pre v-if="formValues" class="showcase__form-result">submit: {{ formValues }}</pre>
      </template>

      <!-- UiLayoutContainer: демо-ячейки -->
      <template v-else-if="slug === 'layout-container'">
        <component :is="comp" v-bind="state">
          <div v-for="n in 6" :key="n" class="showcase__demo-box">{{ n }}</div>
        </component>
      </template>

      <!-- Общий случай -->
      <template v-else>
        <component :is="comp" v-if="meta.hasModel" v-bind="state" v-model="model">
          <template v-if="meta.slotText !== undefined" #default>{{ slotText }}</template>
        </component>
        <component :is="comp" v-else v-bind="state">
          <template v-if="meta.slotText !== undefined" #default>{{ slotText }}</template>
        </component>
      </template>
    </div>

    <aside class="showcase__panel">
      <h3 class="showcase__panel-title">{{ dict.props }}</h3>
      <PropsPanel :key="panelKey" :fields="meta.props" :state="state" />

      <template v-if="meta.slotText !== undefined">
        <h3 class="showcase__panel-title">{{ dict.slot }}</h3>
        <input v-model="slotText" type="text" class="showcase__slot-input" />
      </template>

      <template v-if="meta.hasModel">
        <h3 class="showcase__panel-title">{{ dict.vModel }}</h3>
        <code class="showcase__model-value">{{ JSON.stringify(model) }}</code>
      </template>

      <button type="button" class="showcase__reset" @click="resetProps">
        {{ dict.reset }}
      </button>
    </aside>
  </div>

  <details class="code-block code-block--usage" open>
    <summary class="code-block__summary">{{ dict.viewCode }}</summary>
    <div class="code-block__body">
      <button class="code-block__copy" type="button" @click="copyUsage">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {{ copied ? dict.copied : dict.copy }}
      </button>
      <pre><code>{{ usageCode }}</code></pre>
    </div>
  </details>
</template>
