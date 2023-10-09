<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { CONSTANTS, useKeyboardEvents } from '@/composables'
import { useCalculatorStore } from '@/stores/calculator'
import CalculatorScreen from '@/components/CalculatorScreen.vue'

const calculatorStore = useCalculatorStore()
const output: Ref<string> = ref('')
const currentOperation: Ref<string> = ref('')
const firstOperand: Ref<string> = ref('')
const secondOperand: Ref<string> = ref('')
const currentNumber: Ref<string> = ref('')
const total: Ref<string> = ref('')
const divisionByZeroError: Ref<boolean> = ref(false)
const buttons = CONSTANTS.buttons

useKeyboardEvents({
  onEnterPress: calculateTotal,
  onEscapePress: reset,
  onNumberPress: onButtonClick,
  onMathOperationPress: onButtonClick,
  onNumberRelease: onNumberKeyRelease
})

function isOperation(value: string): boolean {
  return CONSTANTS.OPERATIONS.includes(value)
}

function isDecimal(value: string): boolean {
  return value === '.'
}

function shouldSkipCalculation(): boolean {
  return divisionByZeroError.value || !secondOperand.value
}

function getOperandsAndOperation(): { first: string; second: string; operation: string } {
  firstOperand.value = total.value ? total.value : firstOperand.value
  secondOperand.value = total.value ? secondOperand.value : output.value
  const operation = currentOperation.value

  return { first: firstOperand.value, second: secondOperand.value, operation }
}

function handleDecimalInput(value: string) {
  if (output.value.includes(value)) {
    return
  }

  if (!output.value) {
    output.value = '0.'
    return
  }

  output.value += value
}

function handleUserInput(value: string): void {
  if (value === '=') {
    calculateTotal()
    return
  }
  if (value === 'C') {
    reset()
    return
  }
}

function handleNumberInput(value: string) {
  currentNumber.value = value

  if (firstOperand.value && !secondOperand.value) {
    output.value = value
    secondOperand.value = value
    return
  }

  if (total.value) {
    output.value = value
    total.value = ''
    return
  }

  output.value += value
}

function handleDivisionByZero(): void {
  calculatorStore.$patch((state) => {
    state.history.push(CONSTANTS.DIVISION_BY_ZERO_ERROR)
    state.visualHistory = `${firstOperand.value}${currentOperation.value}${secondOperand.value}=`
  })
  output.value = CONSTANTS.DIVISION_BY_ZERO_ERROR
  firstOperand.value = ''
  secondOperand.value = ''
  divisionByZeroError.value = true
}

function checkExtraZeros(value: string): boolean {
  return (value === '0' && output.value === '') || (value === '0' && output.value === '0')
}

function handleOperation(operation: string) {
  firstOperand.value = output.value
  currentOperation.value = operation
}

function onButtonClick(value: string): void {
  handleUserInput(value)

  if (checkExtraZeros(value)) {
    output.value = ''
    return
  }

  if (divisionByZeroError.value) {
    divisionByZeroError.value = false
    output.value = value
    return
  }

  if (isOperation(value)) {
    handleOperation(value)
    return
  }

  if (isDecimal(value)) {
    handleDecimalInput(value)
    return
  }

  handleNumberInput(value)
}

function updateCalculatorState(
  result: number,
  first: string,
  second: string,
  operation: string
): void {
  calculatorStore.$patch((state) => {
    state.history.push(`${first}${operation}${second}=${result}`)
    state.visualHistory = `${first}${operation}${second}=`
  })

  total.value = `${result}`
  output.value = total.value
}

function calculateTotal(): void {
  if (shouldSkipCalculation()) {
    return
  }

  const { first, second, operation } = getOperandsAndOperation()

  if (parseFloat(second) === 0) {
    handleDivisionByZero()
    return
  }

  const operationResult = performOperation(first, second, operation)

  updateCalculatorState(operationResult, first, second, operation)
}

function performOperation(value: string, nextValue: string, operation: string): number {
  const result =
    {
      '+': parseFloat(value) + parseFloat(nextValue),
      '-': parseFloat(value) - parseFloat(nextValue),
      '/': parseFloat(value) / parseFloat(nextValue),
      '*': parseFloat(value) * parseFloat(nextValue)
    }[operation] || 0
  return result
}

function onNumberKeyRelease(): void {
  currentNumber.value = ''
}

function reset(): void {
  firstOperand.value = ''
  secondOperand.value = ''
  currentOperation.value = ''
  output.value = ''
  total.value = ''
  divisionByZeroError.value = false
  calculatorStore.$reset()
}
</script>

<template>
  <div class="w-full dark:bg-white bg-slate-900 p-2 rounded-xl">
    <div class="dark:bg-slate-800 bg-white rounded-xl">
      <CalculatorScreen :history="calculatorStore.historyData" :output="output" />
      <div class="grid grid-cols-4 grid-rows-5 gap-1">
        <button
          v-for="({ text, classes }, index) in buttons"
          :key="index"
          class="dark:text-white text-black font-light text-2xl dark:bg-slate-700 bg-slate-300 p-4 hover:bg-gray-200 hover:dark:bg-gray-600 transition-all select-none"
          :class="[
            classes,
            { '!bg-green-600': currentOperation === text },
            { '!bg-gray-600 ': currentNumber === text }
          ]"
          @click="onButtonClick(text)"
        >
          {{ text }}
        </button>
      </div>
    </div>
  </div>
</template>
