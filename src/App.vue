<template>
  <div 
    class="min-h-screen bg-cover bg-center relative inset-0 bg-black bg-opacity-40" 
    style="background-image: url('../assets/b3149b102e8afbd0e8357929e3a08ede.jpg'); background-size: cover; background-attachment: fixed;">


    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div class="flex flex-col items-center">
        <img src="../assets/5fe9a1430b395d6277e2dd6d40c3e4-unscreen.gif" alt="Loading..." class="h-70 w-70" />
      </div>
    </div>

    <!-- Only show navigation and header if not on the login page or error page -->
    <div v-if="!isLoginPage && !isErrorPage" class="pt-4 ">
      <nav class="bg-orange-200 py-3 shadow-lg rounded-2xl max-w-7xl mx-auto w-full sm:space-y-4 p-6 justify-between items-center">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-wrap justify-between">
            
            <!-- Left Section -->
            <div class="flex sm:flex-row sm:items-center sm:w-auto w-full justify-between">
              <router-link to="/" class="flex items-center">
                <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 pulse">Tab Tracker</span>
              </router-link>
            </div>
            
            <div class="flex sm:flex-row sm:items-center sm:space-x-6 sm:pl-0 pl-8 w-full sm:w-auto justify-start sm:justify-center">
                <!-- Home Icon with Link -->
                <router-link
                  to="/home"
                  class="flex items-center text-gray-600 relative group px-4 py-2 rounded-lg transition-all duration-500 hover:bg-orange-400 hover:text-white"
                  :class="{ 'bg-orange-400 text-white': $route.path === '/home' }"
                >
                    <svg class="w-5 h-5 mr-2 transition-transform duration-500 group-hover:scale-x-[-1] group-focus:scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v9a2 2 0 01-2 2h-6a2 2 0 01-2-2v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  </svg>
                  <span class="text-sm sm:text-xs md:text-sm lg:text-base font-bold">Home</span>
                </router-link>

                <!-- Create Icon with Link -->
                <router-link
                to="/create"
                class="flex items-center text-gray-600 relative group px-4 py-2 rounded-lg transition-all duration-500 hover:bg-orange-400 hover:text-white"
                :class="{ 'bg-orange-400 text-white': $route.path === '/create' }"
                >
                <svg class="w-5 h-5 mr-2 transition-transform duration-500 group-hover:rotate-180 group-focus:rotate-180 rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span class="text-sm sm:text-xs md:text-sm lg:text-base font-bold">Create</span>
                </router-link>

                <!-- Tuning Icon with Link -->
                <router-link
                to="/tuning-guitar"
                class="flex items-center text-gray-600 relative group px-4 py-2 rounded-lg transition-all duration-500 hover:bg-orange-400 hover:text-white"
                :class="{ 'bg-orange-400 text-white': $route.path === '/tuning-calculator' }"
                >
                <svg class="w-5 h-5 mr-2 transition-transform duration-500 group-hover:rotate-180 group-focus:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a2 2 0 00-2 2v2H8a2 2 0 00-2 2v2H4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-2h2a2 2 0 002-2v-2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2h-2z"/>
              
                </svg>
                <span class="text-sm sm:text-xs md:text-sm lg:text-base font-bold">Tuning</span>
                </router-link>

                <!-- Favorites Icon with Link -->
                <router-link
                to="/favorites"
                class="flex items-center text-gray-600 relative group px-4 py-2 rounded-lg transition-all duration-500 hover:bg-orange-400 hover:text-white"
                :class="{ 'bg-orange-400 text-white': $route.path === '/favorites' }"
                >
                <svg class="w-5 h-5 mr-2 transition-transform duration-500 group-hover:scale-x-[-1] group-focus:scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/>
                </svg>
                <span class="text-sm sm:text-xs md:text-sm lg:text-base font-bold">Favorites</span>
                </router-link>

                <!-- Rejected icon with Link -->
                <router-link
                to="/rejected"
                class="flex items-center text-gray-600 relative group px-4 py-2 rounded-lg transition-all duration-500 hover:bg-orange-400 hover:text-white"
                :class="{ 'bg-orange-400 text-white': $route.path === '/rejected' }"
                >
                <svg class="w-5 h-5 mr-2 transition-transform duration-500 group-hover:rotate-180 group-focus:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span class="text-sm sm:text-xs md:text-sm lg:text-base font-bold">Reject</span>
                </router-link>

            </div>
            <!-- User Dropdown -->
            <div class="dropdown relative">
              <button
                class="dropdown-button flex items-center gap-2 p-2 bg-white border rounded-md shadow-md hover:bg-gray-100 focus:ring-1 focus:ring-orange-400"
                @click="toggleDropdown"
              >
                <!-- User Icon -->
                <div class="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <img v-if="profileImage" :src="profileImage" alt="User Profile" class="absolute w-6 h-6 object-cover rounded-full"/>
                  <svg v-else class="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                </div>
                
                <!-- Dynamic User Name (visible on larger screens) -->
                <span class="hidden sm:block text-sm sm:text-xs md:text-sm lg:text-base">{{ firstName }} {{ lastName }}</span>

                <!-- Toggle Dropdown Arrow -->
                <i :class="['fa', showDropdown ? 'fa-caret-up' : 'fa-caret-down']"></i>
              </button>

              <!-- Dropdown Content -->
              <div v-show="showDropdown" class="dropdown-content absolute right-1 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 ">
                <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</router-link>
                <div class="border-t border-gray-100"></div>
                <a class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" @click="logout">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
  
</template>


<script>
import axios from "axios";

export default {
  name: "MainLayout",
  data() {
    return {
      stage_link: "https://aapistage.newalchemysolutions.com",
      loading: false, 
      firstName: "", 
      lastName: "", 
      profileImage: "",
      showDropdown: false,
    };
  },

  computed: {
    isLoginPage() {
      return this.$route.path.toLowerCase() === "/login";
    },
    isErrorPage() {
      return this.$route.name === "ErrorPage";
    },
  },

  mounted() {
    this.updateUserData();
    window.addEventListener("storage", this.updateUserData);
    this.startLocalStorageObserver();
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.updateUserData);
    this.stopLocalStorageObserver();
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    updateUserData() {
      const firstName = localStorage.getItem("first_name") || "";
      const lastName = localStorage.getItem("last_name") || "";
      const profileImage = localStorage.getItem("profile_image");

      this.firstName = firstName;
      this.lastName = lastName;
      
      // Validate and set profile image
      this.profileImage = profileImage && profileImage.startsWith("http") ? profileImage : "";
    },
    startLocalStorageObserver() {
      this.localStorageObserver = setInterval(() => {
      const profileImage = localStorage.getItem("profile_image");
      if (profileImage !== this.profileImage) {
        this.updateUserData();
      }
      }, 1000); // Check every second
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector(".dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        this.showDropdown = false;
      }
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    async logout() {
      this.loading = true;
      try {
        const headers = JSON.parse(localStorage.getItem("headers"));
        const response = await axios.delete(`${this.stage_link}/logout`, { headers });

        if (response.status === 200) {
          localStorage.clear();
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        this.loading = false;
      }
    },
    stopLocalStorageObserver() {
      if (this.localStorageObserver) {
        clearInterval(this.localStorageObserver);
      }
    },
  },

  watch: {
    $route() {
      this.updateUserData();
      this.showDropdown = false; // Close dropdown when route changes
    },
  },
};
</script>


<style scoped>
/* Dropdown styles */
.dropdown {
  position: relative;
}

.dropdown-content {
  display: block;
  z-index: 10;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.pulse {
  animation: pulse 1s infinite;
}
</style>