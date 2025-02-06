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

    <!-- Tabs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tab in filteredTabs"
        :key="tab.id"
        class="relative bg-white rounded-lg shadow-md p-6"
      >
        <!-- Remove Button -->
        <button @click="removeTab(tab.id)" class="absolute top-2 right-2 text-red-500 hover:text-red-700">✖</button>

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

        <!-- YouTube Video Embed if videoLink exists -->
        <div v-if="tab.videoLink" class="mt-4">
          <iframe
            :src="tab.videoLink"
            width="560"
            height="315"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const tabs = ref([]) 
const createdTabs = ref([]) 
const removedTabIds = ref([]) 
const searchQuery = ref('') 

// Computed property for filtering tabs based on the search query
const filteredTabs = computed(() => {
  const combinedTabs = [...tabs.value, ...createdTabs.value] 
  return combinedTabs.filter(
    tab =>
      !removedTabIds.value.includes(tab.id) && 
      (tab.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        tab.artist.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

// Function to fetch tabs from the backend
const fetchTabs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/tabs') 
    tabs.value = response.data
  } catch (error) {
    console.error('Error fetching tabs:', error)
  }
}

// Method to remove a specific tab
const removeTab = async (tabId) => {
  try {
    // Send a DELETE request to the backend
    await axios.delete(`http://localhost:5000/tabs/${tabId}`);
    
    // Remove the tab from the local state
    removedTabIds.value.push(tabId); // Add the ID to the removed IDs list

    // Remove the tab from the `tabs` array (if fetched from backend)
    tabs.value = tabs.value.filter(tab => tab.id !== tabId);

    // Also remove it from the `createdTabs` if applicable
    createdTabs.value = createdTabs.value.filter(tab => tab.id !== tabId);
  } catch (error) {
    console.error('Error removing tab:', error);
  }
};

// Method to add a new tab
const addTab = () => {
  const newTab = {
    id: Date.now(), // Generate a unique ID
    title: 'New Tab Title', 
    artist: 'New Tab Artist', 
    difficulty: 'Easy', 
    videoLink: '',  // Added video link placeholder
  }

  // Only add the tab if its ID isn't in the `removedTabIds` array
  if (!removedTabIds.value.includes(newTab.id)) {
    createdTabs.value.push(newTab)
  }
}

// Fetch tabs when the component is mounted
onMounted(fetchTabs)
</script>
