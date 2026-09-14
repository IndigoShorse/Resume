<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '450px',
  },
  marginBottom: {
    type: Number,
    default: 12,
  },
  marginTop: {
    type: Number,
    default: 0,
  },
  thickness: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div
      class="ui-divider"
      :style="{
        width,
        marginBottom: `${marginBottom}px`,
        marginTop: `${marginTop}px`,
        height: `${thickness}px`,
        ...(color ? { background: color } : {}),
      }"
  />
</template>
