<template>
  <div class="max-w-2xl mx-auto w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
    <h1 class="text-3xl font-bold mb-6">Add New Tab</h1>
    <form @submit.prevent="createTab" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Song Title</label>
        <input
          v-model="tab.title"
          type="text"
          class="mt-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Artist</label>
        <input
          v-model="tab.artist"
          type="text"
          class="mt-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          v-model="tab.difficulty"
          class="mt-1 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-2 md:w-full"
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
          class="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter"
          required
        ></textarea>
      </div>
      <!-- YouTube Link Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700">YouTube Link</label>
        <input
          v-model="tab.youtubeLink"
          type="url"
          class="mt-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          placeholder="https://www.youtube.com/watch?v=video_id"
        >
      </div>

      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
        <button
          class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
          @click="goToHome"
        >
          Cancel
        </button>
        <button
          class="mb-2 md:mb-0 bg-blue-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-800"
          type="submit"
        >
          Save
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
  tab: '',
  youtubeLink: '' // Add youtubeLink here
})

const createTab = async () => {
  try {
    const response = await axios.post('http://localhost:5000/tabs', tab.value)
    console.log('Tab created successfully:', response.data)
    router.push('/') // Redirect after saving
  } catch (error) {
    console.error('Error creating tab:', error)
  }
}

const goToHome = () => {
  router.push('/') // Navigate to the homepage route
}
</script>
