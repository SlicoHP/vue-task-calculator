<script setup lang="ts">
import { useCalculatorStore } from '@/stores/calculator'

const calculatorStore = useCalculatorStore()
</script>

<template>
  <div
    class="max-h-96 w-full ml-10 max-w-xs overflow-x-hidden overflow-hidden flex flex-col-reverse"
  >
    <div>
      <TransitionGroup name="history">
        <p
          class="dark:text-white text-black text-xl truncate text-ellipsis"
          v-for="(calculatorHistory, index) in calculatorStore.historyData"
          :key="index"
        >
          {{ calculatorHistory }}
        </p>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.history-enter-active,
.history-leave-active {
  transition: all 0.5s ease;
}
.history-enter-from,
.history-leave-to {
  transform: translateX(-50px);
  @apply text-green-600;
}
</style>
