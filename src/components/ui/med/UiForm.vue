<script setup>
import { Form } from 'vee-validate';
import UiBack from './UiBack.vue'
import UiButton from './UiButton.vue'
import UiDivider from './UiDivider.vue'
import UiAlert from './UiAlert.vue'

const emit = defineEmits(["submit", "cancel"]);

defineProps({
  validationSchema: {
    type: Object,
    default: null,
  },
  width: {
    type: Number,
    default: 400,
  },
  gap: {
    type: Number,
    default: 24,
  },
  title: {
    type: String,
    default: null,
  },
  titleAlign: {
    type: String,
    default: 'left', // center, right
  },
  titleWidth: {
    type: Number,
    default: null,
  },
  isSubmitBtnShown: {
    type: Boolean,
    default: true,
  },
  subtitle: {
    type: String,
    default: null,
  },
  confirmBtnDisabled: {
    type: Boolean,
    default: false,
  },
  cancelBtnDisabled: {
    type: Boolean,
    default: false,
  },
  btnLoading: {
    type: Boolean,
    default: false,
  },
  confirmTitle: {
    type: String,
    default: "Завершить",
  },
  cancelTitle: {
    type: String,
    default: null,
  },
  btnSize: {
    type: String,
    default: "m",
  },
  btnsDirection: {
    type: String,
    default: "row", // column
  },
  btnsAlign: {
    type: String,
    default: "end", // start, center
  },
  btnsFullWidth: {
    type: Boolean,
    default: false,
  },
  hideConfirm: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, null],
    default: null,
  },
  backLabel: {
    type: String,
    default: null,
  },
  backTo: {
    type: String,
    default: null,
  },
  alert: {
    type: String,
    default: null,
  }
})
</script>

<template>
  <Form
      class="ui-form"
      :validation-schema="validationSchema"
      @submit="(values, actions) => emit('submit', values, actions)"
      :style="{
        'width': width + 'px',
        'gap': gap + 'px',
      }"
  >
    <div v-if="!!backLabel && !!backTo" class="ui-form__back">
      <UiBack :label="backLabel" :to="backTo"/>
    </div>
    <div v-if="!!title || !!subtitle" class="ui-form__head">
      <h5
          v-if="!!title"
          class="ui-form__title"
          :style="{
            'text-align': titleAlign,
            'width': titleWidth ? titleWidth + 'px' : '100%',
          }"
      >{{ title }}</h5>
      <p
          v-if="!!subtitle"
          class="ui-form__subtitle"
          :style="{
            'text-align': titleAlign,
            'width': titleWidth ? titleWidth + 'px' : '100%',
          }"
      >{{ subtitle }}</p>
    </div>
    <div class="ui-form__sections">
      <slot/>
    </div>
    <div
        v-if="!!$slots.btns || !!cancelTitle || !hideConfirm"
        class="ui-form__btns"
        :class="[
        `ui-form__btns--direction-${btnsDirection}`,
        `ui-form__btns--align-${btnsAlign}`,
      ]"
    >
      <slot name="btns"/>
      <UiButton
          v-if="!!cancelTitle"
          type="button"
          :label="cancelTitle"
          :disabled="cancelBtnDisabled"
          color="secondary"
          @click="$emit('cancel')"
          wide
          :full-width="btnsFullWidth"
      />
      <UiButton
          v-if="!hideConfirm"
          type="submit"
          :label="confirmTitle"
          :disabled="confirmBtnDisabled"
          :loading="btnLoading"
          wide
          :full-width="btnsFullWidth"
      />
    </div>

    <div
        v-if="!!error"
        class="ui-form__error"
    >
      {{ error }}
    </div>
    <div v-if="!!alert">
      <UiDivider
          :width="`100%`"
          :margin-bottom="20"
      />
      <UiAlert
          :text="alert"
      />
    </div>
    <div
        v-if="!!$slots.append"
        class="ui-form__append"
    >
      <slot name="append"/>
    </div>
  </Form>
</template>
