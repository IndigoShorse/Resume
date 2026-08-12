<script setup lang="ts">
import { reactive, ref } from 'vue'
import { registry, componentMap } from './registry'
import PropsPanel from './PropsPanel.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'

const props = defineProps<{ slug: string }>()

const meta = registry.find((m) => m.slug === props.slug)!
const comp = componentMap[props.slug]

// стартовое состояние пропсов из манифеста (глубокая копия дефолтов)
const state = reactive<Record<string, any>>(
  Object.fromEntries(
    meta.props.map((p) => [p.name, JSON.parse(JSON.stringify(p.default ?? null))])
  )
)
const model = ref<any>(meta.modelDefault ?? null)
const slotText = ref(meta.slotText ?? '')

const formValues = ref<Record<string, unknown> | null>(null)
</script>

<template>
  <div class="showcase">
    <div class="showcase__preview">
      <!-- UiModal: нужен триггер открытия -->
      <template v-if="slug === 'modal'">
        <UiButton label="Открыть модалку" @click="model = true" />
        <component
            :is="comp"
            v-bind="state"
            v-model="model"
            @confirm-action="model = false"
        />
      </template>

      <!-- UiStepper: слайды рендерятся по слотам step-N -->
      <template v-else-if="slug === 'stepper'">
        <component
            :is="comp"
            :key="JSON.stringify(state.steps)"
            v-bind="state"
            v-model="model"
        >
          <template
              v-for="(step, i) in state.steps"
              :key="i"
              #[`step-${i}`]
          >
            <div class="showcase__demo-step">
              <h4>{{ step.label }}</h4>
              <p>Содержимое шага {{ i + 1 }}</p>
            </div>
          </template>
        </component>
      </template>

      <!-- UiForm: демо-поля внутри формы -->
      <template v-else-if="slug === 'form'">
        <component
            :is="comp"
            v-bind="state"
            @submit="(values: any) => (formValues = values)"
            @cancel="formValues = null"
        >
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
        <component
            :is="comp"
            v-if="meta.hasModel"
            v-bind="state"
            v-model="model"
        >
          <template v-if="meta.slotText !== undefined" #default>{{ slotText }}</template>
        </component>
        <component
            :is="comp"
            v-else
            v-bind="state"
        >
          <template v-if="meta.slotText !== undefined" #default>{{ slotText }}</template>
        </component>
      </template>
    </div>

    <aside class="showcase__panel">
      <h3 class="showcase__panel-title">Пропсы</h3>
      <PropsPanel :fields="meta.props" :state="state" />

      <template v-if="meta.slotText !== undefined">
        <h3 class="showcase__panel-title">Слот</h3>
        <input v-model="slotText" type="text" class="showcase__slot-input" />
      </template>

      <template v-if="meta.hasModel">
        <h3 class="showcase__panel-title">v-model</h3>
        <code class="showcase__model-value">{{ JSON.stringify(model) }}</code>
      </template>
    </aside>
  </div>
</template>

<style scoped>
.showcase {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 900px) {
  .showcase {
    grid-template-columns: minmax(0, 1fr);
  }
}

.showcase__preview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-height: 280px;
  padding: 32px;
  box-sizing: border-box;

  background:
      linear-gradient(45deg, rgba(2, 6, 23, 0.03) 25%, transparent 25%, transparent 75%, rgba(2, 6, 23, 0.03) 75%),
      linear-gradient(45deg, rgba(2, 6, 23, 0.03) 25%, transparent 25%, transparent 75%, rgba(2, 6, 23, 0.03) 75%),
      #fff;
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: auto;
}

.showcase__panel {
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.showcase__panel-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
}
.showcase__panel-title + .showcase__panel-title,
.props-panel + .showcase__panel-title,
.showcase__slot-input + .showcase__panel-title,
.showcase__model-value + .showcase__panel-title {
  margin-top: 20px;
}

.showcase__slot-input {
  width: 100%;
  box-sizing: border-box;
  min-height: 32px;
  padding: 6px 10px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
}

.showcase__model-value {
  display: block;
  padding: 8px 10px;
  background: var(--bg-color);
  border-radius: 6px;
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 12px;
  word-break: break-all;
}

.showcase__demo-step {
  padding: 24px;
}
.showcase__demo-step h4 {
  margin: 0 0 8px;
  font-size: 18px;
}
.showcase__demo-step p {
  margin: 0;
  color: var(--subtitle-color);
}

.showcase__demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: var(--primary-color);
  border-radius: 8px;
  font-weight: 600;
}

.showcase__form-result {
  margin: 0;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 12px;
  max-width: 100%;
  overflow: auto;
}
</style>
