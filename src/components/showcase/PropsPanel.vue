<script setup lang="ts">
import { reactive } from 'vue'
import type { PropField } from '@/data/registry'
import { getDict } from '@/i18n'

const dict = getDict().showcase

const props = defineProps<{
  fields: PropField[]
  /** реактивный объект состояния пропсов — мутируется напрямую */
  state: Record<string, any>
}>()

// json-поля редактируются как текст; невалидный JSON не применяется к состоянию
const jsonDrafts = reactive<Record<string, { text: string; valid: boolean }>>({})
for (const f of props.fields) {
  if (f.type === 'json') {
    jsonDrafts[f.name] = { text: JSON.stringify(props.state[f.name], null, 2), valid: true }
  }
}

function onJsonInput(name: string, event: Event) {
  const text = (event.target as HTMLTextAreaElement).value
  jsonDrafts[name].text = text
  try {
    props.state[name] = JSON.parse(text)
    jsonDrafts[name].valid = true
  } catch {
    jsonDrafts[name].valid = false
  }
}

function onNumberInput(name: string, event: Event) {
  const value = (event.target as HTMLInputElement).value
  props.state[name] = value === '' ? null : Number(value)
}
</script>

<template>
  <div class="props-panel">
    <div
        v-for="field in fields"
        :key="field.name"
        class="props-panel__field"
    >
      <label class="props-panel__label" :for="`prop-${field.name}`">
        {{ field.name }}
        <span class="props-panel__type">{{ field.type }}</span>
      </label>

      <input
          v-if="field.type === 'string'"
          :id="`prop-${field.name}`"
          v-model="state[field.name]"
          type="text"
          class="props-panel__control"
      />

      <input
          v-else-if="field.type === 'number'"
          :id="`prop-${field.name}`"
          :value="state[field.name]"
          type="number"
          class="props-panel__control"
          @input="onNumberInput(field.name, $event)"
      />

      <label
          v-else-if="field.type === 'boolean'"
          class="props-panel__checkbox"
      >
        <input
            :id="`prop-${field.name}`"
            v-model="state[field.name]"
            type="checkbox"
        />
        <span>{{ state[field.name] ? 'true' : 'false' }}</span>
      </label>

      <select
          v-else-if="field.type === 'select'"
          :id="`prop-${field.name}`"
          v-model="state[field.name]"
          class="props-panel__control"
      >
        <option
            v-for="option in field.options"
            :key="option"
            :value="option"
        >
          {{ option === '' ? '—' : option }}
        </option>
      </select>

      <textarea
          v-else-if="field.type === 'json'"
          :id="`prop-${field.name}`"
          :value="jsonDrafts[field.name].text"
          class="props-panel__control props-panel__control--json"
          :class="{ 'props-panel__control--invalid': !jsonDrafts[field.name].valid }"
          rows="6"
          spellcheck="false"
          @input="onJsonInput(field.name, $event)"
      />
    </div>

    <p v-if="!fields.length" class="props-panel__empty">
      {{ dict.noProps }}
    </p>
  </div>
</template>

<style scoped>
.props-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.props-panel__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.props-panel__label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  font-weight: 600;
  font-size: 13px;
}

.props-panel__type {
  color: var(--subtitle-color);
  font-weight: 400;
  font-size: 11px;
}

.props-panel__control {
  width: 100%;
  box-sizing: border-box;
  min-height: 32px;
  padding: 6px 10px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
}
.props-panel__control:focus {
  outline: 1px solid var(--primary-color);
}

.props-panel__control--json {
  font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
  font-size: 12px;
  resize: vertical;
}
.props-panel__control--invalid {
  border-color: #ef4444;
  outline-color: #ef4444;
}

.props-panel__checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: var(--subtitle-color);
}

.props-panel__empty {
  color: var(--subtitle-color);
  font-size: 13px;
  margin: 0;
}
</style>
