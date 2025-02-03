<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Add New Tab</h1>
    <form @submit.prevent="createTab" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Song Title</label>
        <input
          v-model="tab.title"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Artist</label>
        <input
          v-model="tab.artist"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          v-model="tab.difficulty"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Tab</label>
        <textarea
          v-model="tab.tab"
          rows="6"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Tab
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const tab = ref({
  title: '',
  artist: '',
  difficulty: 'Beginner',
  tab: ''
})

const createTab = async () => {
  try {
    // Make the API call to save the tab
    const response = await axios.post('http://localhost:5000/tabs', tab.value)
    
    // Handle successful response
    console.log('Tab created successfully:', response.data)

 

    router.push('/')
  } catch (error) {
    // Handle error
    console.error('Error creating tab:', error)
  }
}
</script>
