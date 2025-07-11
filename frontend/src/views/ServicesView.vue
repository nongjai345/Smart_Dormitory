<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('services.title') }}</h1>
      <button class="btn btn-primary px-4 py-2">
        <Plus class="w-4 h-4 mr-2" />
        {{ $t('services.createRequest') }}
      </button>
    </div>

    <!-- Service Requests -->
    <div class="space-y-4">
      <div
        v-for="request in serviceRequests"
        :key="request.id"
        class="card p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <StatusBadge
                :status="request.status"
                type="service"
                :show-icon="true"
              />
              <span class="text-sm text-gray-500">{{ request.category }}</span>
              <span class="text-sm text-gray-500">{{ request.urgency }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ $t('tenants.roomNo') }} {{ request.roomNo }}
            </h3>
            <p class="text-gray-600 mb-3">{{ request.description }}</p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>{{ request.submittedAt }}</span>
              <span v-if="request.assignedStaff">
                {{ $t('services.assignedStaff') }}: {{ request.assignedStaff }}
              </span>
            </div>
          </div>
          <div class="flex-shrink-0 ml-4">
            <div class="flex space-x-2">
              <button class="btn btn-secondary px-3 py-1 text-xs">
                {{ $t('actions.view') }}
              </button>
              <button class="btn btn-primary px-3 py-1 text-xs">
                {{ $t('actions.edit') }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Request Images -->
        <div v-if="request.images && request.images.length > 0" class="mt-4">
          <div class="flex space-x-2">
            <img
              v-for="image in request.images"
              :key="image"
              :src="image"
              :alt="$t('services.uploadPhoto')"
              class="w-16 h-16 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Service Request Form Modal -->
    <div v-if="showCreateForm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('services.createRequest') }}</h3>
        
        <form @submit.prevent="submitRequest" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('services.category') }}
            </label>
            <select v-model="newRequest.category" class="input" required>
              <option value="">Select category</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="aircon">Air Conditioning</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('services.description') }}
            </label>
            <textarea
              v-model="newRequest.description"
              rows="3"
              class="input"
              required
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('services.urgency') }}
            </label>
            <select v-model="newRequest.urgency" class="input" required>
              <option value="low">{{ $t('urgency.low') }}</option>
              <option value="medium">{{ $t('urgency.medium') }}</option>
              <option value="high">{{ $t('urgency.high') }}</option>
              <option value="urgent">{{ $t('urgency.urgent') }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('services.uploadPhoto') }}
            </label>
            <input
              type="file"
              @change="handleFileUpload"
              class="input"
              accept="image/*"
              multiple
            />
          </div>
          
          <div class="flex space-x-3">
            <button
              type="submit"
              class="btn btn-primary flex-1"
            >
              {{ $t('actions.submit') }}
            </button>
            <button
              type="button"
              @click="showCreateForm = false"
              class="btn btn-secondary flex-1"
            >
              {{ $t('actions.cancel') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import StatusBadge from '../components/StatusBadge.vue'

const showCreateForm = ref(false)

const serviceRequests = ref([
  {
    id: 1,
    roomNo: '101',
    category: 'Electrical',
    description: 'Power outlet not working in bedroom',
    urgency: 'high',
    status: 'pending',
    submittedAt: '2024-02-15 10:30',
    assignedStaff: 'John Technician',
    images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=64&h=64&fit=crop']
  },
  {
    id: 2,
    roomNo: '205',
    category: 'Plumbing',
    description: 'Toilet is clogged and overflowing',
    urgency: 'urgent',
    status: 'inProgress',
    submittedAt: '2024-02-14 14:15',
    assignedStaff: 'Mike Plumber',
    images: []
  }
])

const newRequest = ref({
  category: '',
  description: '',
  urgency: 'medium',
  images: []
})

const handleFileUpload = (event: any) => {
  const files = Array.from(event.target.files)
  // Handle file upload logic
  console.log('Files selected:', files)
}

const submitRequest = () => {
  // Handle form submission
  console.log('Submitting request:', newRequest.value)
  showCreateForm.value = false
}
</script>