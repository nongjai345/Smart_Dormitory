<template>
  <div class="card p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img
          :src="tenant.photo || defaultAvatar"
          :alt="tenant.name"
          class="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">{{ tenant.name }}</h3>
        <p class="text-sm text-gray-600">{{ $t('tenants.roomNo') }}: {{ tenant.roomNo }}</p>
        <StatusBadge
          :status="tenant.status"
          type="room"
          :show-icon="true"
          class="mt-2"
        />
      </div>
      <div class="flex-shrink-0">
        <div class="flex space-x-2">
          <button
            @click="viewTenant"
            class="btn btn-secondary px-3 py-1 text-xs"
          >
            {{ $t('actions.view') }}
          </button>
          <button
            @click="editTenant"
            class="btn btn-primary px-3 py-1 text-xs"
          >
            {{ $t('actions.edit') }}
          </button>
          <button
            v-if="tenant.status === 'expired'"
            @click="renewTenant"
            class="btn btn-success px-3 py-1 text-xs"
          >
            {{ $t('actions.renew') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

interface Props {
  tenant: {
    id: string
    name: string
    roomNo: string
    photo?: string
    status: string
  }
}

const props = defineProps<Props>()

const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'

const viewTenant = () => {
  // Handle view tenant
  console.log('View tenant:', props.tenant.id)
}

const editTenant = () => {
  // Handle edit tenant
  console.log('Edit tenant:', props.tenant.id)
}

const renewTenant = () => {
  // Handle renew tenant
  console.log('Renew tenant:', props.tenant.id)
}
</script>