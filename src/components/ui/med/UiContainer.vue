<script setup lang="ts">

const props = defineProps({
  marginTop: {
    type: Number,
    default: null,
  },
  isRow: {
    type: Boolean,
    default: false,
  },
  centered: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
    validator(variant: string) {
      return [
        'default',
        'inset',
      ].includes(variant)
    }
  },
  width: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  }
})

</script>

<template>
  <div
      class="ui-container"
      :class="[
          `ui-container--${variant}`,
          {'ui-container--row': isRow},
          {'ui-container--centered': centered},
      ]"
      :style="`
      margin-top: ${marginTop ? marginTop : 0}px;
      ${width ? 'width: ' + width + 'px' : ''}
      ${height ? 'height: ' + height + 'px' : ''}
      `"
  >
    <slot />
  </div>
</template>
