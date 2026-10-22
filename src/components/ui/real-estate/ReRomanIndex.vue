<script setup lang="ts">
withDefaults(defineProps<{
  value: number
  size?: 'default' | 'large' | 'xl'
}>(), {
  size: 'large',
})

const toRoman = (value: number) => {
  const numerals: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let remainder = Math.max(1, Math.floor(value))
  let result = ''
  for (const [number, roman] of numerals) {
    while (remainder >= number) {
      result += roman
      remainder -= number
    }
  }
  return result
}
</script>

<template>
  <span class="re-roman-index" :class="`re-roman-index--${size}`">{{ toRoman(value) }}</span>
</template>
