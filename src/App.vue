<script setup lang="ts">
import { useCalculatorStore } from '@/stores/calculator'
import DarkModeWidget from '@/components/DarkModeWidget.vue'
import CalculatorWidget from './components/CalculatorWidget.vue'
import CalculatorHistory from './components/CalculatorHistory.vue'

const calculatorStore = useCalculatorStore()
</script>

<template>
  <div class="dark:bg-gray-900 bg-gray-200 w-full h-screen flex">
    <div class="w-full h-full mx-auto flex items-center justify-center">
      <div class="transiton-all max-w-xs flex flex-col items-center justify-center w-full">
        <DarkModeWidget />
        <CalculatorWidget />
      </div>
      <Transition>
        <CalculatorHistory v-show="calculatorStore.history.length" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
