<template>
  <div class="max-w-10xl mx-auto w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
    <h1 class="text-3xl font-bold mb-6 text-center">Guitar Tabs</h1>

    <!-- Search Bar -->
    <div class="mb-6 flex justify-center">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by song title or artist..."
      class="px-4 w-1/2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div
    v-for="tab in filteredTabs"
    :key="tab.id"
    class="relative bg-white rounded-lg shadow-md p-6"
  >
    <!-- Remove Button -->
    <button
      @click="removeTab(tab.id)"
      class="absolute top-2 right-2 text-red-500 hover:text-red-700"
    >
      ✖
    </button>

    <h2 class="text-xl font-semibold mb-2">{{ tab.title }}</h2>
    <p class="text-gray-600 mb-4">{{ tab.artist }}</p>
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500">Difficulty: {{ tab.difficulty }}</span>
      <router-link
        :to="'/view/' + tab.id"
        class="text-blue-600 hover:text-blue-800 underline"
      >
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

const tabs = ref([]) // Store all fetched tabs
const createdTabs = ref([]) // Store newly created tabs
const removedTabIds = ref([]) // Track removed tab IDs
const searchQuery = ref('') // Store the search input

// Computed property for filtering tabs based on the search query
const filteredTabs = computed(() => {
  const combinedTabs = [...tabs.value, ...createdTabs.value] // Combine fetched and created tabs
  return combinedTabs.filter(
    tab =>
      !removedTabIds.value.includes(tab.id) && // Exclude removed tabs
      (tab.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        tab.artist.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

// Function to fetch tabs from the backend
const fetchTabs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/tabs') // Replace with your API endpoint
    tabs.value = response.data
  } catch (error) {
    console.error('Error fetching tabs:', error)
  }
}

// Method to remove a specific tab
const removeTab = (tabId) => {
  removedTabIds.value.push(tabId) // Add the tab ID to the removed list
}

// Method to add a new tab
const addTab = () => {
  const newTab = {
    id: Date.now(), // Use a unique ID for local tabs
    title: 'New Tab Title', // Placeholder title
    artist: 'New Tab Artist', // Placeholder artist
    difficulty: 'Easy', // Placeholder difficulty
  }
  createdTabs.value.push(newTab) // Add the new tab to the createdTabs array
}

// Fetch tabs when the component is mounted
onMounted(fetchTabs)
</script>

