<script setup lang="ts">
import { computed } from 'vue'
import { useCalculatorStore } from '@/stores/calculator'

const calculatorStore = useCalculatorStore()

const props = defineProps({
  output: { type: String, required: true }
})

const dynamicOutputSize = computed(() => {
  const outputLength = props.output.length

  if (outputLength >= 14) {
    return 'text-2xl'
  }

  if (outputLength >= 10) {
    return 'text-4xl'
  }

  if (outputLength >= 7) {
    return 'text-5xl'
  }

  return 'text-7xl'
})

const dynamicHistorySize = computed(() => {
  const outputLength = calculatorStore.historyData.length

  if (outputLength >= 14) {
    return 'text-lg'
  }

  if (outputLength >= 10) {
    return 'text-xl'
  }

  return 'text-2xl'
})
</script>

<template>
  <div
    class="dark:text-white text-black rounded-t-xl h-40 flex flex-col items-end justify-end p-4 truncate"
  >
    <span class="transition-all duration-300 ease-in-out" :class="dynamicHistorySize">
      {{ calculatorStore.visualHistoryData }}
    </span>
    <span
      class="transition-all duration-300 ease-in-out font-light select-none"
      :class="dynamicOutputSize"
      >{{ output || '0' }}</span
    >
  </div>
</template>
