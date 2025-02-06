<template>
  <div class="max-w-4xl mx-auto flex flex-col items-center">
    <div v-if="tab" class="bg-white rounded-lg shadow-md p-6 w-full">

      <!-- Centered Title -->
      <h1 class="text-3xl font-bold mb-2 text-center">{{ tab.title }}</h1>
      <p class="text-xl text-gray-600 mb-4 text-center">by {{ tab.artist }}</p>
      <div class="mb-6 text-center">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {{ tab.difficulty }}
        </span>
      </div>

          <!-- YouTube Video Section -->
          <div v-if="tab.youtubeLink" class="mt-4 flex flex-col items-center">
            <iframe
              :src="getYouTubeEmbedUrl(tab.youtubeLink)"
              width="600"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="rounded-lg shadow-lg"
            ></iframe>
          </div>
          <p v-else class="text-gray-500 mt-2 text-center">No YouTube link available</p>

      <pre class="bg-gray-200 p-4 mt-4 rounded-lg overflow-x-auto font-mono text-sm">{{ tab.tab }}</pre>

      <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
        <button
          class="mb-2 mt-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
          @click="goToHome"
        >
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
const router = useRouter()
const tab = ref(null)
const isVideoPlaying = ref(false)

onMounted(async () => {
  try {
    const tabId = route.params.id
    const response = await axios.get(`http://localhost:5000/tabs/${tabId}`)
    tab.value = response.data
  } catch (error) {
    console.error('Error fetching tab:', error)
    tab.value = null
  }
})

const goToHome = () => {
  router.push('/')
}

// Toggle video play/pause
const toggleVideo = () => {
  isVideoPlaying.value = !isVideoPlaying.value
}

// Generate YouTube embed URL from the provided link
const getYouTubeEmbedUrl = (url) => {
  try {
    const videoId = url.split('v=')[1]?.split('&')[0] // Extract video ID from URL
    return `https://www.youtube.com/embed/${videoId}`
  } catch {
    console.error('Invalid YouTube URL:', url)
    return ''
  }
}
</script>
