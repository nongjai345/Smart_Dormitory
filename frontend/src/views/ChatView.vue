<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('chat.title') }}</h1>
      <button class="btn btn-primary px-4 py-2">
        <Plus class="w-4 h-4 mr-2" />
        {{ $t('chat.globalAnnouncement') }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chat List -->
      <div class="lg:col-span-1">
        <div class="card p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Conversations</h3>
          <div class="space-y-2">
            <div
              v-for="chat in chats"
              :key="chat.id"
              @click="selectChat(chat)"
              class="p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              :class="{ 'bg-primary-50': selectedChat?.id === chat.id }"
            >
              <div class="flex items-center space-x-3">
                <img
                  :src="chat.avatar"
                  :alt="chat.name"
                  class="w-8 h-8 rounded-full"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">{{ chat.name }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</p>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-xs text-gray-500">{{ chat.time }}</span>
                  <span v-if="chat.unread" class="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                    {{ chat.unread }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="lg:col-span-2">
        <div class="card h-96 flex flex-col">
          <div v-if="selectedChat" class="flex-1 flex flex-col">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200">
              <div class="flex items-center space-x-3">
                <img
                  :src="selectedChat.avatar"
                  :alt="selectedChat.name"
                  class="w-8 h-8 rounded-full"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ selectedChat.name }}</p>
                  <p class="text-xs text-gray-500">{{ selectedChat.roomNo }}</p>
                </div>
              </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 p-4 overflow-y-auto">
              <div class="space-y-4">
                <div
                  v-for="message in messages"
                  :key="message.id"
                  class="flex"
                  :class="{ 'justify-end': message.sender === 'admin' }"
                >
                  <div
                    class="max-w-xs px-4 py-2 rounded-lg"
                    :class="message.sender === 'admin' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-900'"
                  >
                    <p class="text-sm">{{ message.content }}</p>
                    <p class="text-xs opacity-75 mt-1">{{ message.timestamp }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="p-4 border-t border-gray-200">
              <div class="flex space-x-2">
                <input
                  v-model="newMessage"
                  type="text"
                  :placeholder="$t('chat.sendMessage')"
                  class="flex-1 input"
                  @keyup.enter="sendMessage"
                />
                <button
                  @click="sendMessage"
                  class="btn btn-primary px-4 py-2"
                >
                  <Send class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center text-gray-500">
            <MessageSquare class="w-12 h-12 mr-3" />
            <span>Select a conversation to start chatting</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Global Announcements -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('chat.globalAnnouncement') }}</h3>
      <div class="space-y-4">
        <div
          v-for="announcement in announcements"
          :key="announcement.id"
          class="p-4 bg-blue-50 rounded-lg"
        >
          <h4 class="font-medium text-gray-900">{{ announcement.title }}</h4>
          <p class="text-sm text-gray-600 mt-1">{{ announcement.content }}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-gray-500">{{ announcement.timestamp }}</span>
            <span class="text-xs text-gray-500">{{ announcement.readCount }} read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Send, MessageSquare } from 'lucide-vue-next'

const selectedChat = ref(null)
const newMessage = ref('')

const chats = ref([
  {
    id: 1,
    name: 'John Doe',
    roomNo: '101',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'Thank you for fixing the air conditioner',
    time: '10:30 AM',
    unread: 2
  },
  {
    id: 2,
    name: 'Jane Smith',
    roomNo: '205',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9dc5dd2?w=32&h=32&fit=crop&crop=face',
    lastMessage: 'When will the water be back on?',
    time: '09:15 AM',
    unread: 1
  }
])

const messages = ref([
  {
    id: 1,
    sender: 'tenant',
    content: 'Hi, the air conditioner in my room is not working',
    timestamp: '10:00 AM'
  },
  {
    id: 2,
    sender: 'admin',
    content: 'Thank you for reporting. We will send a technician today',
    timestamp: '10:05 AM'
  },
  {
    id: 3,
    sender: 'tenant',
    content: 'Thank you for fixing the air conditioner',
    timestamp: '10:30 AM'
  }
])

const announcements = ref([
  {
    id: 1,
    title: 'Water Maintenance Notice',
    content: 'Water will be temporarily shut off tomorrow from 9 AM to 12 PM for maintenance.',
    timestamp: '2024-02-14 08:00 AM',
    readCount: 45
  },
  {
    id: 2,
    title: 'New Laundry Room Hours',
    content: 'The laundry room will now be open 24/7 for your convenience.',
    timestamp: '2024-02-13 02:00 PM',
    readCount: 32
  }
])

const selectChat = (chat: any) => {
  selectedChat.value = chat
}

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: Date.now(),
      sender: 'admin',
      content: newMessage.value,
      timestamp: new Date().toLocaleTimeString()
    })
    newMessage.value = ''
  }
}
</script>