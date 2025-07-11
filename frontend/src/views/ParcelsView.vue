<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('parcels.title') }}</h1>
      <button class="btn btn-primary px-4 py-2">
        <Plus class="w-4 h-4 mr-2" />
        {{ $t('parcels.addParcel') }}
      </button>
    </div>

    <!-- Parcel List -->
    <div class="space-y-4">
      <div
        v-for="parcel in parcels"
        :key="parcel.id"
        class="card p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <Package class="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ $t('parcels.recipient') }}: {{ parcel.recipient }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $t('tenants.roomNo') }}: {{ parcel.roomNo }}
              </p>
              <p class="text-sm text-gray-600">
                {{ $t('parcels.receivedDate') }}: {{ parcel.receivedDate }}
              </p>
              <p v-if="parcel.trackingNumber" class="text-sm text-gray-600">
                {{ $t('parcels.trackingNumber') }}: {{ parcel.trackingNumber }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <StatusBadge
              :status="parcel.status"
              type="parcel"
              :show-icon="true"
            />
            <div class="flex space-x-2">
              <button class="btn btn-secondary px-3 py-1 text-xs">
                {{ $t('parcels.qrVerification') }}
              </button>
              <button
                v-if="parcel.status === 'unclaimed'"
                class="btn btn-success px-3 py-1 text-xs"
              >
                Mark as Claimed
              </button>
            </div>
          </div>
        </div>
        
        <!-- Parcel Photo -->
        <div v-if="parcel.photo" class="mt-4">
          <img
            :src="parcel.photo"
            :alt="$t('parcels.parcelPhoto')"
            class="w-24 h-24 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Clock class="w-8 h-8 text-warning-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('status.unclaimed') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ unclaimedCount }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Check class="w-8 h-8 text-success-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ $t('status.claimed') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ claimedCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Package, Clock, Check } from 'lucide-vue-next'
import StatusBadge from '../components/StatusBadge.vue'

const parcels = ref([
  {
    id: 1,
    recipient: 'John Doe',
    roomNo: '101',
    receivedDate: '2024-02-15',
    trackingNumber: 'TH123456789',
    status: 'unclaimed',
    photo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=96&h=96&fit=crop'
  },
  {
    id: 2,
    recipient: 'Jane Smith',
    roomNo: '205',
    receivedDate: '2024-02-14',
    trackingNumber: 'TH987654321',
    status: 'claimed',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=96&h=96&fit=crop'
  }
])

const unclaimedCount = computed(() => {
  return parcels.value.filter(parcel => parcel.status === 'unclaimed').length
})

const claimedCount = computed(() => {
  return parcels.value.filter(parcel => parcel.status === 'claimed').length
})
</script>