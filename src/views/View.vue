<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="tab" class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold mb-2">{{ tab.title }}</h1>
      <p class="text-xl text-gray-600 mb-4">by {{ tab.artist }}</p>
      <div class="mb-6">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {{ tab.difficulty }}
        </span>
      </div>
      <pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto font-mono text-sm">{{ tab.tab }}</pre>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-500">Tab not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const tab = ref(null)

onMounted(async () => {
  const tabId = route.params.id // Get the tab ID from the URL

  try {
    // Make an API call to fetch the tab details
    const response = await axios.get(`http://localhost:5000/tabs/${tabId}`) // Assuming your endpoint is set up to fetch by ID
    tab.value = response.data.tab
  } catch (error) {
    console.error('Error fetching tab:', error)
    tab.value = null // In case of an error, ensure tab is null
  }
})
</script>
