<template>
  <div class="relative max-w-10xl mx-auto w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-1 form-container">
    <h1 class="text-3xl font-bold mb-6 text-center">Add New Tab</h1>
    <section class="border-2 border-dashed border-gray-400 p-5 rounded-xl">
      <form @submit.prevent="createTab" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Song Title</label>
          <input
            v-model="tab.title"
            type="text"
            class="mt-1 block w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-lg h-10 px-4"
             placeholder="Enter Song Title"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Artist</label>
          <input
            v-model="tab.artist"
            type="text"
            class="mt-1 block w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-lg h-10 px-4"
             placeholder="Enter Artist"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Difficulty</label>
          <select
            v-model="tab.difficulty"
            class="mt-1 block w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-lg h-10 px-2 md:w-full"
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
            class="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 block w-full bg-gray-100 text-gray-900 border"
            required
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">YouTube Lyrics Video Link</label>
          <input
              v-model="tab.videoLink"
              type="url"
              class="mt-1 block w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-lg h-10 px-4"
              placeholder="Enter YouTube video URL"
            >
        </div>
        <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
          <button
            class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" 
            @click="goToHome">Cancel</button>
          <button 
            class="mb-2 md:mb-0 bg-orange-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg transition-all duration-500 hover:bg-orange-300" 
            type="submit">Save</button>
        </div>
      </form>
    </section>
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
  videoLink: ''  // Ensure this is initialized correctly
})


const createTab = async () => {
  console.log('Form Data:', tab.value);
  try {
    const response = await axios.post('http://localhost:5000/tabs', tab.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Tab created:', response.data);
    router.push('/');
  } catch (error) {
    console.error('Error creating tab:', error);
  }
}




const goToHome = () => {
  router.push('/') // Navigate to the homepage route
}
</script>
<style scoped>
.form-container {
  position: relative;
  background-color: white;
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

/* Add a pseudo-element for the GIF with opacity */
.form-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('src/assets/0T194mqZLZ28ePJtHR-ezgif.com-video-to-gif-converter.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.2; /* Only the GIF will be transparent */
  z-index: -1; /* Keeps the GIF behind the white background */
  border-radius: inherit; /* Keeps the border radius */
}
</style>