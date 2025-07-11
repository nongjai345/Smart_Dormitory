<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('contracts.title') }}</h1>
      <button class="btn btn-primary px-4 py-2">
        <Plus class="w-4 h-4 mr-2" />
        {{ $t('contracts.createContract') }}
      </button>
    </div>

    <!-- Contract List -->
    <div class="space-y-4">
      <div
        v-for="contract in contracts"
        :key="contract.id"
        class="card p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ contract.tenantName }} - {{ $t('tenants.roomNo') }} {{ contract.roomNo }}
            </h3>
            <div class="mt-2 space-y-1">
              <p class="text-sm text-gray-600">
                {{ $t('contracts.startDate') }}: {{ contract.startDate }}
              </p>
              <p class="text-sm text-gray-600">
                {{ $t('contracts.endDate') }}: {{ contract.endDate }}
              </p>
              <p class="text-sm text-gray-600">
                {{ $t('contracts.rentalPrice') }}: ฿{{ contract.rentalPrice.toLocaleString() }}
              </p>
            </div>
            <div class="mt-3 flex items-center space-x-3">
              <StatusBadge
                :status="contract.status"
                type="contract"
                :show-icon="true"
              />
              <span v-if="contract.autoRenew" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {{ $t('contracts.autoRenew') }}
              </span>
              <span v-if="contract.digitalSignature" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ $t('contracts.digitalSignature') }}
              </span>
            </div>
          </div>
          <div class="flex-shrink-0 ml-4">
            <div class="flex space-x-2">
              <button class="btn btn-secondary px-3 py-1 text-xs">
                {{ $t('contracts.downloadPDF') }}
              </button>
              <button class="btn btn-primary px-3 py-1 text-xs">
                {{ $t('actions.edit') }}
              </button>
              <button
                v-if="contract.status === 'expired'"
                class="btn btn-success px-3 py-1 text-xs"
              >
                {{ $t('actions.renew') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expiring Contracts Alert -->
    <div v-if="expiringContracts.length > 0" class="card p-6 bg-warning-50 border-warning-200">
      <h3 class="text-lg font-semibold text-warning-800 mb-4">
        <AlertTriangle class="w-5 h-5 inline mr-2" />
        {{ $t('contracts.expiringContracts') }}
      </h3>
      <div class="space-y-2">
        <div
          v-for="contract in expiringContracts"
          :key="contract.id"
          class="flex items-center justify-between p-3 bg-white rounded-lg"
        >
          <div>
            <p class="font-medium text-gray-900">{{ contract.tenantName }}</p>
            <p class="text-sm text-gray-600">
              {{ $t('tenants.roomNo') }} {{ contract.roomNo }} - 
              {{ $t('contracts.endDate') }}: {{ contract.endDate }}
            </p>
          </div>
          <button class="btn btn-warning px-3 py-1 text-xs">
            {{ $t('actions.renew') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, AlertTriangle } from 'lucide-vue-next'
import StatusBadge from '../components/StatusBadge.vue'

const contracts = ref([
  {
    id: 1,
    tenantName: 'John Doe',
    roomNo: '101',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rentalPrice: 3000,
    status: 'occupied',
    autoRenew: true,
    digitalSignature: true
  },
  {
    id: 2,
    tenantName: 'Jane Smith',
    roomNo: '205',
    startDate: '2023-06-01',
    endDate: '2024-03-15',
    rentalPrice: 3500,
    status: 'expired',
    autoRenew: false,
    digitalSignature: true
  }
])

const expiringContracts = computed(() => {
  const now = new Date()
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  
  return contracts.value.filter(contract => {
    const endDate = new Date(contract.endDate)
    return endDate <= thirtyDaysFromNow && endDate >= now
  })
})
</script>