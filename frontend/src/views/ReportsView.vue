<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('reports.title') }}</h1>
      <div class="flex space-x-2">
        <button class="btn btn-secondary px-4 py-2">
          <Download class="w-4 h-4 mr-2" />
          {{ $t('reports.exportPDF') }}
        </button>
        <button class="btn btn-secondary px-4 py-2">
          <Download class="w-4 h-4 mr-2" />
          {{ $t('reports.exportExcel') }}
        </button>
      </div>
    </div>

    <!-- Date Range Filter -->
    <div class="card p-6">
      <div class="flex items-center space-x-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('reports.dateRange') }}
          </label>
          <input
            type="date"
            v-model="dateRange.start"
            class="input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            &nbsp;
          </label>
          <input
            type="date"
            v-model="dateRange.end"
            class="input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            &nbsp;
          </label>
          <button class="btn btn-primary px-4 py-2">
            {{ $t('actions.filter') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <DollarSign class="w-8 h-8 text-success-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('reports.monthlyIncome') }}</p>
            <p class="text-2xl font-bold text-gray-900">฿{{ monthlyIncome.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Percent class="w-8 h-8 text-primary-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('reports.occupancyRate') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ occupancyRate }}%</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CreditCard class="w-8 h-8 text-warning-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('reports.billPayments') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ billPayments }}%</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Users class="w-8 h-8 text-danger-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('reports.tenantStatistics') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalTenants }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('reports.monthlyIncome') }}</h3>
        <div class="h-64 flex items-center justify-center text-gray-500">
          <BarChart3 class="w-12 h-12 mr-3" />
          <span>Monthly Income Chart</span>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('reports.occupancyRate') }}</h3>
        <div class="h-64 flex items-center justify-center text-gray-500">
          <PieChart class="w-12 h-12 mr-3" />
          <span>Occupancy Rate Chart</span>
        </div>
      </div>
    </div>

    <!-- Detailed Reports Table -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Payment Summary</h3>
        <div class="flex space-x-2">
          <button
            @click="viewMode = 'table'"
            class="btn btn-secondary px-3 py-1 text-xs"
            :class="{ 'btn-primary': viewMode === 'table' }"
          >
            {{ $t('reports.tableView') }}
          </button>
          <button
            @click="viewMode = 'chart'"
            class="btn btn-secondary px-3 py-1 text-xs"
            :class="{ 'btn-primary': viewMode === 'chart' }"
          >
            {{ $t('reports.chartView') }}
          </button>
        </div>
      </div>

      <div v-if="viewMode === 'table'" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('common.total') }} Income
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('status.paid') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('status.pending') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('reports.occupancyRate') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="report in monthlyReports" :key="report.month">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ report.month }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ฿{{ report.totalIncome.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ฿{{ report.paidAmount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ฿{{ report.pendingAmount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ report.occupancyRate }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="h-64 flex items-center justify-center text-gray-500">
        <BarChart3 class="w-12 h-12 mr-3" />
        <span>Detailed Chart View</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Download, DollarSign, Percent, CreditCard, Users, BarChart3, PieChart } from 'lucide-vue-next'

const dateRange = ref({
  start: '2024-01-01',
  end: '2024-02-28'
})

const viewMode = ref('table')

const monthlyIncome = ref(450000)
const occupancyRate = ref(82)
const billPayments = ref(95)
const totalTenants = ref(98)

const monthlyReports = ref([
  {
    month: 'January 2024',
    totalIncome: 420000,
    paidAmount: 398000,
    pendingAmount: 22000,
    occupancyRate: 85
  },
  {
    month: 'February 2024',
    totalIncome: 450000,
    paidAmount: 427500,
    pendingAmount: 22500,
    occupancyRate: 82
  }
])
</script>