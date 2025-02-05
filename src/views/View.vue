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
      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
        <button
        class="mb-2 mt-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" 
        @click="goToHome">
        Cancel 
        </button>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-500">Tab not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()  // Ensure useRouter() is imported here
const tab = ref(null)

onMounted(async () => {
  try {
    const tabId = route.params.id // Get the tab ID from the URL
    const response = await axios.get(`http://localhost:5000/tabs/${tabId}`) // Fetch tab details by ID
    tab.value = response.data // Assign the tab details
  } catch (error) {
    console.error('Error fetching tab:', error)
    tab.value = null // Ensure tab is null if an error occurs
  }
})

// Navigate back to the homepage
const goToHome = () => {
  router.push('/') // Navigate to the homepage route
}
</script>
