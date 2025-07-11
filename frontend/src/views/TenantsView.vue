<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('tenants.title') }}</h1>
      <button class="btn btn-primary px-4 py-2">
        <Plus class="w-4 h-4 mr-2" />
        {{ $t('tenants.addTenant') }}
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="card p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              v-model="searchTerm"
              :placeholder="$t('tenants.searchTenant')"
              class="input pl-10"
            />
          </div>
        </div>
        <div class="flex space-x-4">
          <select v-model="selectedBuilding" class="input">
            <option value="">{{ $t('tenants.allBuildings') }}</option>
            <option value="A">Building A</option>
            <option value="B">Building B</option>
            <option value="C">Building C</option>
          </select>
          <select v-model="selectedStatus" class="input">
            <option value="">All Status</option>
            <option value="occupied">{{ $t('status.occupied') }}</option>
            <option value="available">{{ $t('status.available') }}</option>
            <option value="expired">{{ $t('status.expired') }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- View Toggle -->
    <div class="flex justify-center space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      <button
        @click="currentView = 'layout'"
        class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
        :class="currentView === 'layout' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'"
      >
        <Grid class="w-4 h-4 mr-2" />
        {{ $t('tenants.roomLayout') }}
      </button>
      <button
        @click="currentView = 'list'"
        class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
        :class="currentView === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'"
      >
        <List class="w-4 h-4 mr-2" />
        {{ $t('tenants.tenantList') }}
      </button>
    </div>

    <!-- Room Layout View -->
    <div v-if="currentView === 'layout'" class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('tenants.roomLayout') }}</h3>
      <div class="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2">
        <div
          v-for="room in rooms"
          :key="room.id"
          @click="selectRoom(room)"
          class="relative aspect-square border-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          :class="getRoomClass(room.status)"
        >
          <div class="absolute inset-0 flex flex-col items-center justify-center p-1">
            <span class="text-xs font-medium">{{ room.number }}</span>
            <span class="text-xs opacity-75">{{ room.tenantName || 'Empty' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Room Status Legend -->
      <div class="mt-6 flex flex-wrap gap-4">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-success-200 border-2 border-success-400 rounded"></div>
          <span class="text-sm text-gray-600">{{ $t('status.available') }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-primary-200 border-2 border-primary-400 rounded"></div>
          <span class="text-sm text-gray-600">{{ $t('status.occupied') }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-warning-200 border-2 border-warning-400 rounded"></div>
          <span class="text-sm text-gray-600">{{ $t('status.reserved') }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-danger-200 border-2 border-danger-400 rounded"></div>
          <span class="text-sm text-gray-600">{{ $t('status.expired') }}</span>
        </div>
      </div>
    </div>

    <!-- Tenant List View -->
    <div v-if="currentView === 'list'" class="space-y-4">
      <TenantCard
        v-for="tenant in filteredTenants"
        :key="tenant.id"
        :tenant="tenant"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Search, Grid, List } from 'lucide-vue-next'
import TenantCard from '../components/TenantCard.vue'

const searchTerm = ref('')
const selectedBuilding = ref('')
const selectedStatus = ref('')
const currentView = ref('layout')

const rooms = ref([
  { id: 1, number: '101', status: 'occupied', tenantName: 'John Doe' },
  { id: 2, number: '102', status: 'available', tenantName: null },
  { id: 3, number: '103', status: 'reserved', tenantName: 'Jane Smith' },
  { id: 4, number: '104', status: 'expired', tenantName: 'Mike Johnson' },
  // Add more rooms as needed
])

const tenants = ref([
  {
    id: '1',
    name: 'John Doe',
    roomNo: '101',
    status: 'occupied',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jane Smith',
    roomNo: '103',
    status: 'reserved',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b9dc5dd2?w=64&h=64&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    roomNo: '104',
    status: 'expired',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
  }
])

const filteredTenants = computed(() => {
  return tenants.value.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesBuilding = !selectedBuilding.value || tenant.roomNo.startsWith(selectedBuilding.value)
    const matchesStatus = !selectedStatus.value || tenant.status === selectedStatus.value
    return matchesSearch && matchesBuilding && matchesStatus
  })
})

const getRoomClass = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-success-100 border-success-400 text-success-800'
    case 'occupied':
      return 'bg-primary-100 border-primary-400 text-primary-800'
    case 'reserved':
      return 'bg-warning-100 border-warning-400 text-warning-800'
    case 'expired':
      return 'bg-danger-100 border-danger-400 text-danger-800'
    default:
      return 'bg-gray-100 border-gray-300 text-gray-600'
  }
}

const selectRoom = (room: any) => {
  console.log('Selected room:', room)
  // Handle room selection
}
</script>