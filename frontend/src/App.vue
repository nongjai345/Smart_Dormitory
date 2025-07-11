<template>
  <div :class="{ 'dark': isDarkMode }">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavigation @toggle-sidebar="toggleSidebar" />
      <Sidebar :class="{ '-translate-x-full': !isSidebarOpen }" />
      <main class="flex-1 p-2 pt-20 md:pl-[17rem] lg:pl-[17rem]">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TopNavigation from './components/TopNavigation.vue'
import Sidebar from './components/Sidebar.vue'

const isSidebarOpen = ref(false)
const isDarkMode = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Dark mode management
onMounted(() => {
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    isDarkMode.value = e.matches
  })
})
</script>

<style scoped>
#app {
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>