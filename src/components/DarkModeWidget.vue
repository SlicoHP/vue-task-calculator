<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const darkMode: Ref<boolean> = ref(true)

function toggleDarkMode(): void {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>

<template>
  <div
    @click="toggleDarkMode"
    class="cursor-pointer w-8 border-2 mx-auto rounded-full mb-2 flex flex-col dark:border-white border-gray-900"
  >
    <SunIcon class="text-yellow-400 dark:opacity-100 opacity-60" />
    <MoonIcon class="text-gray-900 dark:text-white dark:opacity-30" />
  </div>
</template>
