<script setup lang="ts">
import type { Step } from '@/types/default';
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import UiContainer from './UiContainer.vue'

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
    default: 500,
  },
  headerClickable: {
    type: Boolean,
    default: false,
  },
  contentHeight: {
    type: Number,
    default: 665,
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
  <div class="ui-stepper">
    <div class="ui-stepper__header">
      <div
          class="ui-stepper__header-highlight"
          :style="highlightStyle"
      ></div>

      <button
          v-for="(step, idx) in steps"
          :key="idx"
          :ref="(el) => { if (el) tabRefs[idx] = el as HTMLElement }"
          type="button"
          class="ui-stepper__tab"
          :class="{
            'ui-stepper__tab--active': idx === currentStep,
            'ui-stepper__tab--completed': idx < currentStep,
            'ui-stepper__tab--clickable': headerClickable,
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
      <div class="ui-stepper__viewport">
        <div class="ui-stepper__track" :style="trackStyle">
          <div
              v-for="(step, idx) in steps"
              :key="idx"
              class="ui-stepper__slide"
              :style="{ width: stepWidthPercent }"
          >
            <slot :name="`step-${idx}`" />
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
