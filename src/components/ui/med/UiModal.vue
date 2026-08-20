<script setup lang="ts">
import UiButton from './UiButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Title',
  },
  subtitle: {
    type: String,
    default: 'Subtitle',
  },
  confirmTitle: {
    type: String,
    default: 'Confirm',
  }
})
const emit = defineEmits(['update:modelValue', 'confirmAction'])
</script>

<template>
  <div v-if="modelValue" class="ui-modal__bg">
    <div class="ui-modal">
      <div
          class="ui-modal__content"
      >
        <div class="ui-modal__title">
          {{ title }}
        </div>
        <div class="ui-modal__subtitle">
          {{ subtitle }}
        </div>
        <slot />
        <div v-if="!!$slots.btns" >
          <slot name="btns" />
        </div>
        <div v-else>
          <UiButton
            @click="emit('confirmAction')"
            full-width
            :label="confirmTitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
