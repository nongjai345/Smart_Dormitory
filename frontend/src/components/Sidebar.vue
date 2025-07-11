<template>
  <aside id="sidebar" class="fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0">
    <!-- Use flex-col so footer sticks to bottom while menu scrolls independently if needed -->
    <div class="h-full px-3 pb-4 flex flex-col overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menuItems" :key="item.name">
          <router-link
            :to="item.path"
            class="flex items-center p-2 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
            :class="{ 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300': $route.name === item.name }"
          >
            <component :is="item.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span class="ml-3">{{ $t(`nav.${item.name}`) }}</span>
          </router-link>
        </li>
      </ul>
      <!-- Footer Info -->
      <div class="mt-auto pt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 space-y-1">
        <p class="font-semibold text-gray-700 dark:text-gray-300">Smart Dormitory Ver 1.0</p>
        <p>Sudjai.t@kpsofttech.com</p>
        <p>Tel: (+66) 837828902</p>
        <p>©2025 KPSoftTech. All Rights Reserved</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  MessageSquare, 
  Package, 
  BarChart3 
} from 'lucide-vue-next'

const menuItems = [
  { name: 'dashboard', path: '/', icon: LayoutDashboard },
  { name: 'tenants', path: '/tenants', icon: Users },
  { name: 'contracts', path: '/contracts', icon: FileText },
  { name: 'billing', path: '/billing', icon: CreditCard },
  { name: 'services', path: '/services', icon: Settings },
  { name: 'chat', path: '/chat', icon: MessageSquare },
  { name: 'parcels', path: '/parcels', icon: Package },
  { name: 'reports', path: '/reports', icon: BarChart3 }
]
</script>