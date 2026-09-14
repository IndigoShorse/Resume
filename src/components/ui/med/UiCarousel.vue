<script setup lang="ts">
import type { Step } from '@/types/default';
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import UiContainer from './UiContainer.vue'
import UiButton from './UiButton.vue'

const props = defineProps({
  steps: {
    type: Array as () => Step[],
    required: true,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: null,
  },
  headerClickable: {
    type: Boolean,
    default: false,
  },
  contentHeight: {
    type: Number,
    default: 665,
  },
  showNavButtons: {
    type: Boolean,
    default: false,
  },
  prevLabel: {
    type: String,
    default: 'Назад',
  },
  nextLabel: {
    type: String,
    default: 'Далее',
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'next': [step: number]
  'prev': [step: number]
  'finish': []
}>()


const currentStep = ref(props.modelValue)

const totalSteps = computed(() => props.steps.length)

const isFirst = computed(() => currentStep.value === 0)
const isLast = computed(() => currentStep.value === totalSteps.value - 1)

const tabRefs = ref<HTMLElement[]>([])
const highlightLeft = ref(0)
const highlightWidth = ref(0)

function updateHighlight() {
  const tab = tabRefs.value[currentStep.value]
  if (tab) {
    highlightLeft.value = tab.offsetLeft
    highlightWidth.value = tab.offsetWidth
  }
}

onMounted(() => {
  nextTick(updateHighlight)
})

watch(currentStep, () => {
  nextTick(updateHighlight)
})

const highlightStyle = computed(() => ({
  left: `${highlightLeft.value}px`,
  width: `${highlightWidth.value}px`,
}))

function goTo(index: number) {
  if (index < 0 || index >= totalSteps.value) return
  currentStep.value = index
  emit('update:modelValue', index)
}

function next() {
  if (isLast.value) {
    emit('finish')
    return
  }
  emit('next', currentStep.value)
  goTo(currentStep.value + 1)
}

function prev() {
  if (isFirst.value) return
  emit('prev', currentStep.value)
  goTo(currentStep.value - 1)
}

function onHeaderClick(index: number) {
  if (props.headerClickable) {
    goTo(index)
  }
}

const trackStyle = computed(() => ({
  width: `${totalSteps.value * 100}%`,
  transform: `translateX(-${(currentStep.value * 100) / totalSteps.value}%)`,
}))

const stepWidthPercent = computed(() => `${100 / totalSteps.value}%`)

defineExpose({
  prev,
  next,
  goTo,
  isFirst,
  isLast,
  currentStep,
})
</script>

<template>
  <div class="ui-carousel" :style="width ? { width: `${width}px` } : undefined">
    <div class="ui-carousel__header">
      <div
          class="ui-carousel__header-highlight"
          :style="highlightStyle"
      ></div>

      <button
          v-for="(step, idx) in steps"
          :key="idx"
          :ref="(el) => { if (el) tabRefs[idx] = el as HTMLElement }"
          type="button"
          class="ui-carousel__tab"
          :class="{
            'ui-carousel__tab--active': idx === currentStep,
            'ui-carousel__tab--completed': idx < currentStep,
            'ui-carousel__tab--clickable': headerClickable,
          }"
          @click="onHeaderClick(idx)"
      >
        {{ step.label }}
      </button>
    </div>

    <UiContainer
        variant="inset"
        :height="contentHeight"
        :margin-top="20"
    >
      <div class="ui-carousel__viewport">
        <div class="ui-carousel__track" :style="trackStyle">
          <div
              v-for="(step, idx) in steps"
              :key="idx"
              class="ui-carousel__slide"
              :style="{ width: stepWidthPercent }"
          >
            <slot :name="`step-${idx}`" />
          </div>
        </div>
      </div>

      <div v-if="showNavButtons" class="ui-carousel__nav">
        <UiButton
            :label="prevLabel"
            color="secondary"
            :disabled="isFirst"
            @click="prev"
        />
        <UiButton
            :label="nextLabel"
            @click="next"
        />
      </div>
    </UiContainer>
  </div>
</template>
