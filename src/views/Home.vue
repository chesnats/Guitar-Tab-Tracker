<template>
  <div class="max-w-10xl space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 form-container">

      <h1 class="text-3xl font-bold mb-6 text-center">Guitar Tabs</h1>
      <section class="border-2 border-dashed border-gray-400 p-5 rounded-xl">
      <!-- Search Bar -->
      <div class="mb-6 flex justify-center">
        <input v-model="searchQuery" type="text" placeholder="Search by song title or artist..."
          class="px-4 w-1/2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>
      
      <!-- Tabs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tab in filteredTabs" :key="tab.id"
          class="relative bg-orange-100 rounded-lg shadow-md p-6 border-2 border-dashed border-gray-400">
          
          <!-- Remove Button -->
          <button @click="removeTab(tab.id)" class="absolute top-1 right-2 text-red-500 hover:text-red-700">✖</button>
          
          <h2 class="text-xl font-semibold mb-2">{{ tab.title }}</h2>
          <p class="text-gray-600 mb-4">{{ tab.artist }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">Difficulty: {{ tab.difficulty }}</span>
            <router-link :to="'/view/' + tab.id" class="text-blue-600 hover:text-blue-800 underline">View Tab</router-link>
          </div>
          
          <!-- YouTube Video Embed if videoLink exists -->
          <div v-if="tab.youtubeLink" class="mt-4">
            <iframe :src="tab.youtubeLink" width="560" height="315" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
              class="w-full rounded-lg"></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GuitarTabs',
  data() {
    return {
      tabs: [],
      createdTabs: [],
      removedTabIds: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredTabs() {
      const combinedTabs = [...this.tabs, ...this.createdTabs];
      return combinedTabs.filter(
        tab =>
          !this.removedTabIds.includes(tab.id) &&
          (tab.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            tab.artist.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },
  },
  methods: {
    async fetchTabs() {
      try {
        const response = await axios.get('http://localhost:5000/tabs');
        this.tabs = response.data;
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    },
    async removeTab(tabId) {
      try {
        await axios.delete(`http://localhost:5000/tabs/${tabId}`);
        this.removedTabIds.push(tabId);
        this.tabs = this.tabs.filter(tab => tab.id !== tabId);
        this.createdTabs = this.createdTabs.filter(tab => tab.id !== tabId);
      } catch (error) {
        console.error('Error removing tab:', error);
      }
    },
  },
  mounted() {
    this.fetchTabs();
  },
};
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
