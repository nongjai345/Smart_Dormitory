<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('billing.title') }}</h1>
      <button class="btn btn-primary px-4 py-2">
        <Plus class="w-4 h-4 mr-2" />
        {{ $t('billing.createBill') }}
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div class="flex space-x-4">
          <select v-model="selectedMonth" class="input">
            <option value="">{{ $t('billing.filterMonth') }}</option>
            <option value="2024-01">January 2024</option>
            <option value="2024-02">February 2024</option>
            <option value="2024-03">March 2024</option>
          </select>
          <select v-model="selectedBuilding" class="input">
            <option value="">{{ $t('billing.filterBuilding') }}</option>
            <option value="A">Building A</option>
            <option value="B">Building B</option>
            <option value="C">Building C</option>
          </select>
        </div>
        <div class="flex space-x-2">
          <button class="btn btn-secondary px-4 py-2">
            <Download class="w-4 h-4 mr-2" />
            {{ $t('actions.export') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Billing Table -->
    <BillingTable :bills="filteredBills" />

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CreditCard class="w-8 h-8 text-success-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('status.paid') }}</p>
            <p class="text-2xl font-bold text-gray-900">฿{{ paidAmount.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Clock class="w-8 h-8 text-warning-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('status.pending') }}</p>
            <p class="text-2xl font-bold text-gray-900">฿{{ pendingAmount.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <AlertCircle class="w-8 h-8 text-danger-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('status.overdue') }}</p>
            <p class="text-2xl font-bold text-gray-900">฿{{ overdueAmount.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Download, CreditCard, Clock, AlertCircle } from 'lucide-vue-next'
import BillingTable from '../components/BillingTable.vue'

const selectedMonth = ref('')
const selectedBuilding = ref('')

const bills = ref([
  {
    id: '1',
    month: 'February 2024',
    roomNo: '101',
    electricBill: 800,
    waterBill: 150,
    totalAmount: 3950,
    status: 'paid'
  },
  {
    id: '2',
    month: 'February 2024',
    roomNo: '102',
    electricBill: 650,
    waterBill: 120,
    totalAmount: 3770,
    status: 'pending'
  },
  {
    id: '3',
    month: 'February 2024',
    roomNo: '103',
    electricBill: 900,
    waterBill: 180,
    totalAmount: 4080,
    status: 'overdue'
  }
])

const filteredBills = computed(() => {
  return bills.value.filter(bill => {
    const matchesMonth = !selectedMonth.value || bill.month.includes(selectedMonth.value)
    const matchesBuilding = !selectedBuilding.value || bill.roomNo.startsWith(selectedBuilding.value)
    return matchesMonth && matchesBuilding
  })
})

const paidAmount = computed(() => {
  return bills.value
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.totalAmount, 0)
})

const pendingAmount = computed(() => {
  return bills.value
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.totalAmount, 0)
})

const overdueAmount = computed(() => {
  return bills.value
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.totalAmount, 0)
})
</script>