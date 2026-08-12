<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '500px',
  },
  height: {
    type: String,
    default: 'auto',
  },
  image: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: "navigation",
    validator(variant: string) {
      return [
        'navigation',
        'form',
      ].includes(variant)
    }
  }
})
</script>

<template>
  <div
      class="ui-card"
      :class="[
          `ui-card__${variant}`,
      ]"
      :style="`width: ${width}; height: ${height};`"
  >
    <img
        v-if="image"
        :src="`/img/${image}.svg`"
        class="ui-card__image"
        alt=""
    />
    <div class="ui-card__content">
      <h3 class="ui-card__title" v-if="title">
        {{ title }}
      </h3>
      <slot/>
    </div>
  </div>
</template>
