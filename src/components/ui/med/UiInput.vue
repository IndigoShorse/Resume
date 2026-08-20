<script setup lang="ts">
import { computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

type Option = {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

const props = defineProps({
  as: {
    type: String,
    default: 'input',
    validator(as: string) {
      return ['input', 'select', 'textarea', 'radio-group'].includes(as)
    }
  },
  modelValue: {
    type: [String, Number, Boolean, null],
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'text',
    validator(type: string) {
      return ['text', 'number', 'email', 'password', 'tel'].includes(type)
    }
  },
  options: {
    type: Array as () => Option[],
    default: () => [],
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  hasMargin: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  labelBold: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean | null): void
  (e: 'change', value: string | number | boolean | null): void
}>()

const component = computed(() => {
  return props.as
})

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    let nextValue: string | number | boolean | null = value as string | number | boolean | null

    if (props.as === 'input' && props.type === 'number') {
      nextValue = value === '' || value === null ? null : Number(value)
    }

    emit('update:modelValue', nextValue)
    emit('change', nextValue)
  }
})
</script>

<template>
  <label
      class="ui-input"
      :class="[
      {
        'ui-input--full-width': fullWidth,
        'ui-input--has-margin': hasMargin,
        'ui-input--disabled': disabled,
      },
    ]"
  >
    <span
        v-if="label"
        class="ui-input__label"
        :class="[
            {
              'ui-input__label-bolder': labelBold,
            },
        ]"
    >
      {{ label }}
    </span>

    <template v-if="component === 'input'">
      <Field
          v-model="inputValue"
          class="ui-input__control"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
      />
    </template>

    <template v-else-if="component === 'textarea'">
      <Field
          v-model="inputValue"
          as="textarea"
          class="ui-input__control ui-input__control--textarea"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
      />
    </template>

    <template v-else-if="component === 'select'">
      <Field
          v-model="inputValue"
          as="select"
          class="ui-input__control"
          :name="name"
          :disabled="disabled"
      >
        <option
            v-if="placeholder"
            disabled
            value=""
        >
          {{ placeholder }}
        </option>

        <option
            v-for="option in options"
            :key="String(option.value)"
            :value="option.value"
            :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </Field>
    </template>

    <template v-else-if="component === 'radio-group'">
      <div class="ui-input__radio-group">
        <label
            v-for="option in options"
            :key="String(option.value)"
            class="ui-input__radio"
        >
          <Field
              :checked="modelValue === option.value"
              :name="name"
              :value="option.value"
              :disabled="disabled || option.disabled"
              type="radio"
              @change="inputValue = option.value"
          />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </template>

    <ErrorMessage :name="name" class="ui-input__error" />

    <span
        v-if="error"
        class="ui-input__error"
    >
      {{ error }}
    </span>
  </label>
</template>
