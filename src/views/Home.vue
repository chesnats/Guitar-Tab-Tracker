<template>
  <div class="absolute mt-2 ml-[10px] w-[130px] h-[100px] bg-cover bg-center" style="background-image: url('/assets/gJW40PvAOx16R44UE4-ezgif.com-video-to-gif-converter.gif');"></div>
    <div class="max-w-10xl space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 ">
      <h1 class="text-3xl font-bold mb-6 text-center">Guitar Tabs</h1>
  
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
     <span class="sr-only">Open sidebar</span>
     <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
     </svg>
  </button>
  
        <!-- Recently Played Section -->
      <section  v-if="showRecentlyPlayed" class="border-2 border-dashed border-gray-400 p-5 rounded-xl  max-h-screen ">
        <h2 class="text-xl font-bold mb-4">Recently Played</h2>
        <div v-if="recentlyPlayed.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div v-for="tab in recentlyPlayed" :key="tab.id" class="relative bg-orange-100 rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-600">
            <img class="mx-auto w-full block h-40 rounded-lg" alt="art cover" loading="lazy" :src="tab.coverImage || 'https://picsum.photos/seed/2/2000/1000'" />
            <div class="group">
              <button @click="removeRecentlyPlayed(tab.id)" class="absolute top-1 right-2 text-red-500 hover:text-red-700 transform transition-transform duration-300 hover:rotate-90">✖</button>
              <span class="absolute right-0 top-[-30px] hidden group-hover:block bg-gray-500 text-white text-m px-3 py-1 rounded shadow-md">Remove from Recently Played</span>
            </div>
            <h2 class="text-xl font-semibold mt-2 rainbow-text">{{ tab.title }}</h2>
            <p class="text-gray-800 mb-2 bg-orange-300 rounded-2xl px-4 mt-2 py-1 w-fit ">{{ tab.artist }}</p>
              <div class="flex items-center">
              <span class="text-sm bg-red-300 px-3 py-1 mt-1 rounded-l-2xl text-gray-800 mb-5"><i class="fa fa-signal mr-1"></i> <span class="font-italic text-gray-800">{{ tab.difficulty }}</span></span>
              <p class="text-gray-800 mb-4 bg-orange-300 rounded-r-2xl px-2 py-1 text-sm"><i class="fa fa-calendar-alt mr-1"></i> <span class="font-italic text-gray-800">{{ formatDate(tab.createdAt) }}</span></p>
              </div>
  
              <div class="flex justify-start gap-2 items-center">
                <router-link :to="'/view/' + tab.id" class=" hover:bg-red-400 bg-red-500 text-white cursor-pointer px-3 py-1 text-center rounded-2xl " @click="viewTab(tab)">View Tab</router-link>
                <div class="group">
                  <button @click="!isRejected(tab.id) ? toggleFavorite(tab) : null" class="px-3 py-1 rounded-2xl sm:w-auto sm:ml-auto" :class="[{ 'bg-orange-400 shadow-lg text-white cursor-pointer': isFavorite(tab.id), 'text-gray-700 hover:bg-orange-500 bg-orange-400 shadow-lg hover:text-white': !isFavorite(tab.id), 'cursor-not-allowed opacity-50': isRejected(tab.id) }]">
              <i :class="['fa-heart', isFavorite(tab.id) ? 'fa-solid text-red-500' : 'fa-regular']"></i>
            </button>
            <span class="hidden absolute mt-1 group-hover:block bg-gray-500 text-white text-m px-3 py-1 rounded shadow-md">Add to Favorites</span>
            </div>
      
              </div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-center">No recently played tabs.</p>
      </section>
  
      <section class="border-2 border-dashed border-gray-400 p-5 rounded-xl ">
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
  
        <div v-if="filteredTabs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen ">
          <div v-for="tab in filteredTabs" :key="tab.id" :class="[' relative rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-600 ', { 'bg-gray-300': isRejected(tab.id), 'bg-orange-100': !isRejected(tab.id) }]">
          <img class="mx-auto w-full block h-40 rounded-lg" alt="art cover" loading="lazy" src='https://picsum.photos/seed/2/2000/1000' />
          <div class="group">
          <button @click="removeTab(tab.id)" class="absolute top-1 right-2 z-99 text-red-500 hover:text-red-700 transform transition-transform duration-300 hover:rotate-90">✖</button>
          <span class="absolute right-0 top-[-30px] hidden group-hover:block bg-gray-500 text-white text-m px-3 py-1 rounded shadow-md">Delete</span>
            </div>
            <h2 class="text-xl font-semibold mt-2 rainbow-text text">{{ tab.title }}</h2>
            <p class="text-gray-800 mb-2 bg-orange-300 rounded-2xl px-4 mt-2 py-1 w-fit ">{{ tab.artist }}</p>
            <div class="flex items-center">
          <span class="text-sm bg-red-300 px-2 py-1 mt-1 rounded-l-2xl text-gray-800 mb-5"><i class="fa fa-signal mr-1"></i> <span class="font-italic text-gray-800">{{ tab.difficulty }}</span></span>
          <p class="text-gray-800 mb-4 bg-orange-300 rounded-r-2xl px-2 py-1 text-sm"><i class="fa fa-calendar-alt mr-1"></i> <span class="font-italic text-gray-800">{{ formatDate(tab.createdAt) }}</span></p>
            </div>
  
          <div class="flex justify-start gap-2 items-center">
            <router-link
            :to="isRejected(tab.id) ? '' : '/view/' + tab.id"
             class="hover:bg-red-400 bg-red-500 text-white cursor-pointer px-3 py-1 text-center rounded-2xl"
             :class="{ 'cursor-not-allowed opacity-50': isRejected(tab.id) }"
             @click.prevent="isRejected(tab.id) ? null : viewTab(tab)"
             :disabled="isRejected(tab.id)"
              >
            View Tab
              </router-link>    
            <div class="group">
            <button @click="!isRejected(tab.id) ? toggleFavorite(tab) : null" class="px-3 py-1 rounded-2xl sm:w-auto sm:ml-auto" :class="[{ 'bg-orange-400 shadow-lg text-white cursor-pointer': isFavorite(tab.id), 'text-gray-700 hover:bg-orange-500 bg-orange-400 shadow-lg hover:text-white': !isFavorite(tab.id), 'cursor-not-allowed opacity-50': isRejected(tab.id) }]">
              <i :class="['fa-heart', isFavorite(tab.id) ? 'fa-solid text-red-500' : 'fa-regular']"></i>
            </button>
            <span class="hidden absolute mt-1 group-hover:block bg-gray-500 text-white text-m px-3 py-1 rounded shadow-md">Add to Favorites</span>
          </div>
          <div class="group">
            <button 
            @click="toggleRejected(tab)"
            class="px-3 py-1 rounded-2xl sm:w-auto sm:ml-auto" 
            :class="isRejected(tab.id) ? 'bg-red-400 shadow-lg text-white cursor-not-allowed' : 'text-gray-700 hover:bg-red-500 bg-red-400 shadow-lg hover:text-white'" 
            >
            <i :class="isRejected(tab.id) ? 'fa-solid fa-ban text-red-500' : 'fa-regular fa-ban'"></i>
            </button>
            <span class="hidden absolute mt-1 group-hover:block bg-gray-500 text-white text-m px-3 py-1 rounded shadow-md" v-if="!isRejected(tab.id)">Reject</span>
          </div>
           
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-center">No tabs found for the selected difficulty.</p>
      </section>
  
    </div>
  </template>
  
  <script>
  import '@fortawesome/fontawesome-free/css/all.css';
  import {
    createTab,
    getAllTabs,
    deleteTab,
    addToFavorites,
    removeFromFavorites,
    getAllFavorites,
  } from '../services/tabService';
  
  export default {
    name: 'HomePage',
    data() {
      return {
        tabs: [],
        createdTabs: [],
        removedTabIds: [],
        searchQuery: '',
        selectedDifficulty: '',
        showDropdown: false,
        favorites: [],
        rejectedTabs: JSON.parse(localStorage.getItem('rejectedTabs')) || [],
        recentlyPlayed: [],
        showRecentlyPlayed: true,
      };
    },
    computed: {
      filteredTabs() {
        const combinedTabs = [...this.tabs, ...this.createdTabs];
        return combinedTabs.filter(tab => {
          const matchesSearch = tab.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                tab.artist.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesDifficulty = !this.selectedDifficulty || tab.difficulty === this.selectedDifficulty;
          return matchesSearch && matchesDifficulty && !this.removedTabIds.includes(tab.id);
        });
      },
        isFavorite() {
        return (tabId) => this.favorites.some(tab => tab.id === tabId);
      }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return "No date available";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
      },
      createTab(title, artist, difficulty) {
        try {
          const newTab = createTab(title, artist, difficulty);
          this.createdTabs.push(newTab);
          console.log('New Tab Created:', newTab);
        } catch (error) {
          console.error('Error creating tab:', error.message);
        }
      },
      loadRecentlyPlayed() {
        const storedTabs = localStorage.getItem('recentlyPlayed');
        this.recentlyPlayed = storedTabs ? JSON.parse(storedTabs) : [];
      },
      viewTab(tab) {
        this.addToRecentlyPlayed(tab);
      },
      addToRecentlyPlayed(tab) {
        if (!this.recentlyPlayed.some(t => t.id === tab.id)) {
          this.recentlyPlayed.unshift(tab);
          if (this.recentlyPlayed.length > 5) {
            this.recentlyPlayed.pop();
          }
          localStorage.setItem('recentlyPlayed', JSON.stringify(this.recentlyPlayed));
        }
      },
      async fetchTabs() {
        this.tabs = getAllTabs();
      },
      async removeTab(tabId) {
    try {
      // Remove tab from regular tabs
      deleteTab(tabId);
      this.removedTabIds.push(tabId);
      this.tabs = this.tabs.filter(tab => tab.id !== tabId);
      this.createdTabs = this.createdTabs.filter(tab => tab.id !== tabId);

      // Remove tab from Recently Played if it exists there
      this.removeRecentlyPlayed(tabId);

    } catch (error) {
      console.error('Error removing tab:', error.message);
    }
  },

  removeRecentlyPlayed(tabId) {
    this.recentlyPlayed = this.recentlyPlayed.filter(tab => tab.id !== tabId);
    localStorage.setItem('recentlyPlayed', JSON.stringify(this.recentlyPlayed));

    // Optionally, hide the "Recently Played" section if it's empty
    if (this.recentlyPlayed.length === 0) {
      this.showRecentlyPlayed = false; // You can set a flag like this to hide the section in the template
    }
  },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      setDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
        this.showDropdown = false;
      },
      async toggleFavorite(tab) {
        try {
          if (this.isFavorite(tab.id)) {
            await removeFromFavorites(tab.id);
          } else {
            await addToFavorites(tab.id);
          }
          this.favorites = getAllFavorites(); // Refresh favorites after update
        } catch (error) {
          console.error('Error toggling favorite:', error.message);
        }
      },
      isFavorite(tabId) {
        return this.favorites.some(fav => fav.id === tabId);
      },
      async fetchFavorites() {
        this.favorites = await getAllFavorites();
      },
      toggleRejected(tab) {
        const index = this.rejectedTabs.findIndex(rej => rej.id === tab.id);
        if (index !== -1) {
          this.rejectedTabs.splice(index, 1);
        } else {
          this.rejectedTabs.push(tab);
        }
        localStorage.setItem('rejectedTabs', JSON.stringify(this.rejectedTabs));
      },
      isRejected(tabId) {
        return this.rejectedTabs.some(rej => rej.id === tabId);
      },
    },
    mounted() {
      this.fetchTabs();
      this.favorites = getAllFavorites();
      this.loadRecentlyPlayed();
      this.createdTabs = JSON.parse(localStorage.getItem('createdTabs')) || [];
      this.rejectedTabs = JSON.parse(localStorage.getItem('rejectedTabs')) || [];
    },
  };
  </script>
  
  <style>
     /* Hide text initially */
     .sidebar-text {
        opacity: 0;
        transition: opacity 0.3s ease;
     }
  
     /* Show text on sidebar hover */
     #default-sidebar:hover .sidebar-text {
        opacity: 1;
     }
  
     /* Keep icons visible */
     #default-sidebar {
        transition: width 0.3s ease;
        width: 60px; /* Width of the sidebar when not hovered */
     }
  
     /* Expand sidebar on hover */
     #default-sidebar:hover {
        width: 250px; /* Width of the sidebar when hovered */
     }
  
     /* Rainbow text effect */
     .rainbow-text {
        background: linear-gradient(to right,  blue, indigo, violet, blue, indigo, violet);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
     }
  </style>