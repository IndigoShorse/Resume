<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  color?: 'primary' | 'secondary' | 'plain'
  as?: 'button' | 'a'
  href?: string
  fullWidth?: boolean
  disabled?: boolean
  pending?: boolean
}>(), {
  label: 'Submit',
  color: 'primary',
  as: 'button',
  href: '#',
  fullWidth: false,
  disabled: false,
  pending: false,
})
</script>

<template>
  <component
    :is="as"
    class="re-button"
    :class="[`re-button--${color}`, { 're-button--full-width': fullWidth }]"
    :href="as === 'a' ? href : undefined"
    :disabled="as === 'button' ? disabled || pending : undefined"
  >
    <span class="re-button__text"><slot>{{ pending ? 'Loading…' : label }}</slot></span>
  </component>
</template>
