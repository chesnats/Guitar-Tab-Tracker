<template>
  <div class="absolute mt-2 ml-[10px] w-[130px] h-[100px] bg-cover bg-center" style="background-image: url('../assets/gJW40PvAOx16R44UE4-ezgif.com-video-to-gif-converter.gif');"></div>
    <div class="max-w-10xl space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
      <h1 class="text-3xl font-bold mb-6 text-center">Rejected Tabs</h1>
      
      <section class="border-2 border-dashed border-gray-400 p-5 rounded-xl">
           <!-- Difficulty Select (Left on mobile, stays left on larger screens) -->
           <div class="flex justify-between items-center mb-2 sm:mb-0 ">
                  <button
                    class="flex items-center gap-2 p-2 mb-4 bg-white border rounded-md shadow-md hover:bg-gray-100  focus:ring-1 focus:ring-orange-400"
                    @click="toggleDropdown"
                  >
                  <span class="text-sm text-gray-500">Difficulty: <span class="font-bold text-gray-800">{{ selectedDifficulty || 'All' }}</span></span>
  
  
                    <!-- Toggle Dropdown Arrow -->
                    <i :class="['fa', showDropdown ? 'fa-caret-up' : 'fa-caret-down']"></i>
                  </button>
  
                  <!-- Dropdown Content (links for each difficulty) -->
                  <div v-show="showDropdown" class="dropdown-content absolute mt-52 w-38 z-30 bg-white rounded-md shadow-lg border border-gray-200">
                    <button @click="setDifficulty('')" class="block px-16 py-2 w-full text-gray-700 hover:bg-gray-100 cursor-pointer">All</button>
                    <div class="border-t border-gray-200"></div>
                    <button @click="setDifficulty('Beginner')" class="block px-10 py-2 w-full text-gray-700 hover:bg-gray-100 cursor-pointer">Beginner</button>
                    <button @click="setDifficulty('Intermediate')" class="block px-7 py-2 w-full text-gray-700 hover:bg-gray-100 cursor-pointer">Intermediate</button>
                    <button @click="setDifficulty('Advanced')" class="block px-10 py-2 w-full text-gray-700 hover:bg-gray-100 cursor-pointer">Advanced</button>
                  </div>
                
                    <!-- Search Input (Right on mobile, stays right on larger screens) -->
                    <div class="w-full sm:w-1/2 ml-auto mb-4 ">
                      <div class="relative w-full">
                        <input v-model="searchQuery" type="text" placeholder="Search by song title or artist..."
                          class="px-4 w-full py-2 pr-10 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:bg-white">
                        <!-- Search Icon on the Right -->
                        <i class="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                      </div>
                    </div> 
               </div>
               <div class="border-t border-gray-200 mb-5"></div>
  
       <div v-if="filteredFavorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="tab in filteredFavorites" :key="tab.id" class="bg-gray-300 rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-600 relative">
            <img class="mx-auto w-full block h-40 rounded-lg" alt="art cover" loading="lazy" src='https://picsum.photos/seed/2/2000/1000' />
           
            <h2 class="text-xl font-semibold mt-2 rainbow-text text">{{ tab.title }}</h2>
            <p class="text-gray-800 mb-2 bg-orange-300 rounded-2xl px-4 mt-2 py-1 w-fit ">{{ tab.artist }}</p>
            <div class="flex items-center">
              <span class="text-sm bg-red-300 px-2 py-1 mt-1 rounded-l-2xl text-gray-800 mb-5"><i class="fa fa-signal mr-1"></i> <span class="font-italic text-gray-800">{{ tab.difficulty }}</span></span>
              <p class="text-gray-800 mb-4 bg-orange-300 rounded-r-2xl px-2 py-1 text-sm"><i class="fa fa-calendar-alt mr-1"></i> <span class="font-italic text-gray-800">{{ formatDate(tab.createdAt) }}</span></p>
            </div>
            <div class="flex justify-start gap-2 items-center">
            <router-link  class="hover:bg-red-400 bg-red-500 cursor-not-allowed opacity-50 text-white  px-3 py-1 text-center rounded-2xl">View Tab</router-link>
            <div class="group">
                <button disabled class="px-3 py-1 rounded-2xl sm:w-auto sm:ml-auto text-gray-700 hover:bg-orange-500 bg-orange-400 shadow-lg hover:text-white  cursor-not-allowed  opacity-50">
                  <i class="fa-solid fa-heart text-red-500"></i>
                </button>
                <span class=" hidden absolute mt-1 group-hover:block bg-gray-500 text-white text-m px-3 py-1 rounded shadow-md">Add to Favorites</span>
              </div>
          </div>
        </div>
       </div>
        <p v-else class="text-gray-500 text-center">No favorite tabs found for the selected difficulty.</p>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RejectedTab',
    data() {
      return {
        favorites: JSON.parse(localStorage.getItem('rejectedTabs')) || [],
        selectedDifficulty: "", 
        searchQuery: '',
        createdTabs: [],
        showDropdown: false,
      };
    },
    computed: {
      filteredFavorites() {
        let filteredTabs = this.favorites;
  
        // Filter by difficulty if selected
        if (this.selectedDifficulty) {
          filteredTabs = filteredTabs.filter(tab => tab.difficulty === this.selectedDifficulty);
        }
  
        // Filter by search query (title or artist)
        if (this.searchQuery) {
          filteredTabs = filteredTabs.filter(tab =>
            tab.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            tab.artist.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
  
        return filteredTabs;
      }
    },
    methods: {
      formatDate(dateString) {
      if (!dateString) return "No date available"; 
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
    },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown; // Toggles the dropdown visibility
      },
      setDifficulty(difficulty) {
        this.selectedDifficulty = difficulty; // Sets the selected difficulty
        this.showDropdown = false; // Close the dropdown after selection
      },
      async removeRejectedTab(tabId) {
        try {
          this.favorites = this.favorites.filter(tab => tab.id !== tabId);
          localStorage.setItem('rejectedTabs', JSON.stringify(this.favorites));
  
          await axios.delete(`http://localhost:5000/favorites/${tabId}`);
          console.log('Favorite tab removed from API');
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  