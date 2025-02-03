<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Guitar Tabs</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by song title or artist..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="tab in filteredTabs" :key="tab.id" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-2">{{ tab.title }}</h2>
        <p class="text-gray-600 mb-4">{{ tab.artist }}</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">Difficulty: {{ tab.difficulty }}</span>
          <router-link :to="'/view/' + tab.id" class="text-blue-600 hover:text-blue-800">
            View Tab
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const searchQuery = ref('')
const tabs = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/tabs')
    console.log('Fetched tabs:', response.data) // Log the fetched tabs here
    tabs.value = response.data
  } catch (error) {
    console.error('Error fetching tabs:', error)
  }
})

const filteredTabs = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return tabs.value
  return tabs.value.filter(
    (tab) => tab.title.toLowerCase().includes(query) || tab.artist.toLowerCase().includes(query)
  )
})
</script>
