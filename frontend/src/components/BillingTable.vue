<template>
  <div class="card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('billing.filterMonth') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('tenants.roomNo') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('billing.electricBill') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('billing.waterBill') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('billing.totalAmount') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              QR {{ $t('common.payment') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('status.status') }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('actions.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="bill in bills" :key="bill.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ bill.month }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ bill.roomNo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ฿{{ bill.electricBill.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ฿{{ bill.waterBill.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              ฿{{ bill.totalAmount.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="generateQR(bill.id)"
                class="btn btn-primary px-3 py-1 text-xs"
              >
                {{ $t('billing.generateQR') }}
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <StatusBadge
                :status="bill.status"
                type="payment"
                :show-icon="true"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex space-x-2">
                <button
                  @click="generateReceipt(bill.id)"
                  class="btn btn-secondary px-3 py-1 text-xs"
                >
                  {{ $t('billing.generateReceipt') }}
                </button>
                <button
                  @click="editBill(bill.id)"
                  class="btn btn-primary px-3 py-1 text-xs"
                >
                  {{ $t('actions.edit') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from './StatusBadge.vue'

interface Props {
  bills: Array<{
    id: string
    month: string
    roomNo: string
    electricBill: number
    waterBill: number
    totalAmount: number
    status: string
  }>
}

const props = defineProps<Props>()

const generateQR = (billId: string) => {
  // Handle QR generation
  console.log('Generate QR for bill:', billId)
}

const generateReceipt = (billId: string) => {
  // Handle receipt generation
  console.log('Generate receipt for bill:', billId)
}

const editBill = (billId: string) => {
  // Handle edit bill
  console.log('Edit bill:', billId)
}
</script>