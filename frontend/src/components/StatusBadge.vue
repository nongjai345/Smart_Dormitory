<template>
  <span
    class="status-badge"
    :class="statusClass"
  >
    <component
      v-if="showIcon"
      :is="statusIcon"
      class="w-3 h-3 mr-1"
    />
    {{ displayText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Clock, AlertCircle, XCircle } from 'lucide-vue-next'

interface Props {
  status: string
  type?: 'room' | 'payment' | 'service' | 'parcel'
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'room',
  showIcon: false
})

const { t } = useI18n()

const statusClass = computed(() => {
  switch (props.status) {
    case 'available':
      return 'status-available'
    case 'occupied':
      return 'status-occupied'
    case 'reserved':
      return 'status-reserved'
    case 'expired':
      return 'status-expired'
    case 'paid':
      return 'status-paid'
    case 'pending':
      return 'status-pending'
    case 'overdue':
      return 'status-overdue'
    case 'inProgress':
      return 'bg-blue-100 text-blue-800'
    case 'completed':
      return 'status-paid'
    case 'unclaimed':
      return 'status-pending'
    case 'claimed':
      return 'status-paid'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const statusIcon = computed(() => {
  switch (props.status) {
    case 'paid':
    case 'completed':
    case 'claimed':
      return Check
    case 'pending':
    case 'unclaimed':
      return Clock
    case 'overdue':
    case 'expired':
      return AlertCircle
    case 'available':
      return Check
    default:
      return XCircle
  }
})

const displayText = computed(() => {
  return t(`status.${props.status}`)
})
</script>