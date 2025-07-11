<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ $t('dashboard.title') }}</h1>
      <div class="flex items-center space-x-2">
        <button class="btn btn-primary px-4 py-2 flex items-center">
          <Plus class="w-4 h-4 mr-2" />
          {{ $t('dashboard.addTenant') }}
        </button>
        <button class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-gray-500 dark:focus:ring-gray-600">
          <FileText class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
          {{ $t('dashboard.addBill') }}
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Rooms -->
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
        <div class="p-4 flex items-center">
          <div class="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
            <Door class="w-5 h-5" />
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              ห้องทั้งหมด
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.totalRooms }}
            </p>
          </div>
        </div>
      </div>

      <!-- Occupied Rooms -->
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
        <div class="p-4 flex items-center">
          <div class="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <Users class="w-5 h-5" />
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              ห้องที่มีผู้เช่า
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.occupiedRooms }}
            </p>
          </div>
        </div>
      </div>

      <!-- Unpaid Bills -->
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
        <div class="p-4 flex items-center">
          <div class="p-3 rounded-full text-red-500 dark:text-red-100 bg-red-100 dark:bg-red-500 mr-4">
            <Receipt class="w-5 h-5" />
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              บิลค้างชำระ
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.pendingBills }}
            </p>
          </div>
        </div>
      </div>

      <!-- Maintenance -->
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
        <div class="p-4 flex items-center">
          <div class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
            <Wrench class="w-5 h-5" />
          </div>
          <div>
            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              ค่าซ่อมบำรุง
            </p>
            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {{ stats.maintenanceCost }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Monthly Income Chart -->
      <div class="min-w-0 p-4 rounded-lg shadow-xs bg-white dark:bg-gray-800">
        <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          รายได้ประจำเดือน
        </h4>
        <div class="h-[300px]">
          <apexchart
            type="bar"
            :options="chartOptions"
            :series="chartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Expiring Contracts -->
      <div class="min-w-0 p-4 rounded-lg shadow-xs bg-white dark:bg-gray-800">
        <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          สัญญาหมดอายุ
        </h4>
        <div class="overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th class="px-4 py-3">ห้อง</th>
                <th class="px-4 py-3">ผู้เช่า</th>
                <th class="px-4 py-3">วันหมดอายุ</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr v-for="contract in expiringContracts" :key="contract.id" class="text-gray-700 dark:text-gray-400">
                <td class="px-4 py-3">{{ contract.room }}</td>
                <td class="px-4 py-3">{{ contract.tenant }}</td>
                <td class="px-4 py-3">{{ contract.expiryDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="min-w-0 p-4 rounded-lg shadow-xs bg-white dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        กิจกรรมล่าสุด
      </h4>
      <div class="overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th class="px-4 py-3">กิจกรรม</th>
              <th class="px-4 py-3">ผู้ดำเนินการ</th>
              <th class="px-4 py-3">เวลา</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <tr v-for="activity in recentActivities" :key="activity.id" class="text-gray-700 dark:text-gray-400">
              <td class="px-4 py-3">{{ activity.description }}</td>
              <td class="px-4 py-3">{{ activity.user }}</td>
              <td class="px-4 py-3">{{ activity.timestamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Plus, 
  FileText, 
  Megaphone, 
  Home, 
  Users, 
  CreditCard, 
  Settings,
  UserCheck,
  AlertCircle,
  Home as Door,
  CreditCard as Receipt,
  Settings as Wrench
} from 'lucide-vue-next'

import RevenueChart from '../components/RevenueChart.vue'

const stats = ref({
  totalRooms: 120,
  occupiedRooms: 98,
  pendingBills: 15,
  activeRequests: 8,
  maintenanceCost: 25000
})

const chartOptions = ref({
  chart: {
    type: 'bar',
    foreColor: '#9ca3af', // text color for dark mode
    background: 'transparent',
  },
  theme: {
    mode: 'dark'
  },
  // ... other chart options
})

const chartSeries = ref([
  {
    name: 'รายได้',
    data: [30000, 40000, 35000, 50000, 49000, 60000, 70000, 91000, 125000]
  }
])

const recentActivities = ref([
  {
    id: 1,
    icon: UserCheck,
    description: 'New tenant check-in: John Doe (Room 101)',
    time: '2 hours ago',
    user: 'Admin',
    timestamp: '2024-01-20 14:30'
  },
  {
    id: 2,
    icon: CreditCard,
    description: 'Payment received from Room 205',
    time: '4 hours ago',
    user: 'System',
    timestamp: '2024-01-20 12:30'
  },
  {
    id: 3,
    icon: AlertCircle,
    description: 'Maintenance request: Room 308',
    time: '1 day ago',
    user: 'Tenant',
    timestamp: '2024-01-19 15:45'
  }
])

const expiringContracts = ref([
  {
    id: 1,
    room: '205',
    tenant: 'Jane Smith',
    expiryDate: '2024-02-15'
  },
  {
    id: 2,
    room: '308',
    tenant: 'Mike Johnson',
    expiryDate: '2024-02-20'
  }
])
</script>