<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../shared/Icon.vue'
import UiIcon from './UiIcon.vue'

const props = defineProps({
  as: {
    type: String,
    default: 'button',
    validator(as: string) {
      return ['button', 'nuxt-link', 'a'].includes(as)
    }
  },
  to: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'primary',
    validator(color: string) {
      return [
        'primary',
        'secondary',
        'plain'
      ].includes(color)
    },
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  appendIcon: {
    type: String,
    default: null,
  },
  hasMargin: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  pending: {
    type: Boolean,
    default: false,
  }
})

// 'nuxt-link' сохранён для совместимости с API исходной библиотеки —
// вне Nuxt он рендерится как обычная ссылка <a>
const component = computed(() => {
  if (props.as === 'nuxt-link' || props.as === 'a') {
    return 'a'
  }
  return props.as
})

const isLink = computed(() => component.value === 'a')
</script>

<template>
  <component
    :is="component"
    :href="isLink ? to : null"
    class="ui-button"
    :class="[
      `ui-button--color-${color}`,
      {
        'ui-btn--full-width': fullWidth,
        'ui-btn--has-append': appendIcon,
        'ui-btn--has-margin': hasMargin,
        'ui-btn--pending': pending,
      },
    ]"
    :type="!isLink ? type : null"
    :disabled="disabled || pending"
  >
    <Icon v-if="pending" name="line-md:loading-twotone-loop" size="25" class="ui-btn__pending-icon" />
    <span
        v-else-if="label || $slots.default"
        class="ui-btn__text"
    >
        <template v-if="$slots.default || label">
          <slot> {{ label }}</slot>
        </template>
        </span>
    <UiIcon
        v-if="appendIcon"
        :icon="appendIcon"
        class="ui-btn__append-icon"
    />
  </component>
</template>
