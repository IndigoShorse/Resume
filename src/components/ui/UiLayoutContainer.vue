<script setup lang="ts">
const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    validator: (value: string) => {
      return ['row, col', 'grid-cols', 'grid-rows'].indexOf(value) > -1;
    },
  },
  margin: {
    type: Number,
    default: 0,
  },
  rows: {
    type: Number,
    default: 0,
  },
  cols: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <div
      class="ui-layout-container"
      :class="[
          `ui-layout-container--${direction}`,
          `ui-margin-[${props.margin}px]`
      ]"
      :style="[
          `--margin-val: ${props.margin}px`,
          `grid-template-columns: repeat(${cols}, minmax(0, 1fr))`,
          `grid-template-rows: repeat(${rows}, minmax(0, 1fr))`,
          ]"
  >
    <slot/>
  </div>
</template>

<style scoped>

</style>
