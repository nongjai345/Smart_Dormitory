<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary-500 dark:focus:ring-primary-600"
    >
      <img
        :src="currentLanguage.flag"
        :alt="currentLanguage.name"
        class="w-4 h-4 mr-2"
      />
      {{ currentLanguage.code.toUpperCase() }}
      <ChevronDown class="w-4 h-4 ml-2" />
    </button>
    
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300': locale === lang.code }"
      >
        <img
          :src="lang.flag"
          :alt="lang.name"
          class="w-4 h-4 mr-2"
        />
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown } from 'lucide-vue-next'

const { locale } = useI18n()
const showDropdown = ref(false)

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w20/us.png'
  },
  {
    code: 'th',
    name: 'ไทย',
    flag: 'https://flagcdn.com/w20/th.png'
  }
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const changeLanguage = (langCode: string) => {
  locale.value = langCode
  localStorage.setItem('language', langCode)
  showDropdown.value = false
}
</script>