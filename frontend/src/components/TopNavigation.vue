<template>
  <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-30 top-0">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            @click="toggleSidebar"
            class="p-2 text-gray-600 dark:text-gray-400 rounded cursor-pointer lg:hidden hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700"
          >
            <Menu class="w-6 h-6" />
          </button>
          <div class="flex items-center ml-2 md:ml-0">
            <Building class="w-8 h-8 text-primary-600 dark:text-primary-500 mr-3" />
            <span class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('appName') }}</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <LanguageSwitcher />
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode" 
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Sun v-if="isDarkMode" class="w-6 h-6" />
            <Moon v-else class="w-6 h-6" />
          </button>
          
          <!-- Notifications -->
          <button class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Bell class="w-6 h-6" />
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-danger-500 text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="toggleProfileDropdown"
              class="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="User avatar"
              />
              <ChevronDown class="w-4 h-4 ml-2 text-gray-500 dark:text-gray-400" />
            </button>
            
            <div
              v-if="showProfileDropdown"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                {{ $t('common.profile') }}
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                {{ $t('common.settings') }}
              </a>
              <div class="border-t border-gray-100 dark:border-gray-700"></div>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                {{ $t('common.logout') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Bell, Building, ChevronDown, Sun, Moon } from 'lucide-vue-next'
import LanguageSwitcher from './LanguageSwitcher.vue'

const showProfileDropdown = ref(false)
const isDarkMode = ref(false)

const toggleSidebar = () => {
  document.getElementById('sidebar')?.classList.toggle('hidden')
}

const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

// Check system preference on load
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  isDarkMode.value = true
  document.documentElement.classList.add('dark')
}
</script>