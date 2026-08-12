<script setup lang="ts">
import { ref } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Загрузить фото',
  },
  id: {
    type: String,
    default: null,
  },
  accept: {
    type: String,
    default: 'image/png, image/jpeg, image/jpg',
  }
})

const emit = defineEmits<{
  (e: 'change', file: File | null): void
}>()

const inputId = props.id || `image-input-${props.name}`
const { value: imageValue, resetField } = useField(() => props.name)

const image = ref<HTMLImageElement>()
const isImageHidden = ref<boolean>(true)

function uploadImage(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && image.value) {
    image.value.src = URL.createObjectURL(file)
    isImageHidden.value = false
    emit('change', file)
  }
}

function removeImage() {
  isImageHidden.value = true
  if (image.value) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
    image.value.src = ''
    resetField()
    emit('change', null)
  }
}
</script>

<template>
  <div class="ui-input-image">
    <div class="ui-input-image__container">
      <label
          class="ui-input-image__placeholder"
          :class="{ 'cursor-pointer': isImageHidden }"
          :for="inputId"
      >
        <span :class="{ 'hidden': !isImageHidden }">{{ placeholder }}</span>
        <img
            ref="image"
            src=""
            alt=""
            class="ui-input-image__preview"
            :class="{ 'hidden': isImageHidden }"
        >
      </label>

      <p
          class="ui-input-image__remove"
          :class="{ 'hidden': isImageHidden }"
          @click="removeImage"
      >
        X
      </p>

      <Field
          :id="inputId"
          v-model="imageValue"
          :name="name"
          type="file"
          class="hidden"
          :accept="accept"
          :disabled="!isImageHidden"
          @change="uploadImage"
      />
    </div>
    <div class="ui-input-image__label" v-if="label">
      {{ label }}
    </div>
    <ErrorMessage :name="name" class="ui-input-image__error" />
  </div>
</template>
