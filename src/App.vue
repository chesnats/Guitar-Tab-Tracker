<template>
  <div class="min-h-screen bg-gray-300">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
    >
      <div class="flex flex-col items-center">
        <img src="./assets/loading.gif" alt="Loading..." class="h-70 w-70" />
      </div>
    </div>

    <!-- Only show navigation and header if not on the login page -->
    <div v-if="!isLoginPage">
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <!-- Left Section -->
            <div class="flex">
              <router-link to="/" class="flex items-center">
                <span class="text-xl font-bold text-gray-800">Tab Tracker</span>
              </router-link>
            </div>

            <!-- Center Links -->
            <div class="flex items-center space-x-4 pl-16">
              <router-link to="/" class="text-gray-600 hover:text-gray-900">Home</router-link>
              <router-link to="/create" class="text-gray-600 hover:text-gray-900">Create</router-link>
            </div>

            <!-- User Dropdown -->
            <div class="dropdown relative">
              <button
                class="dropdown-button flex items-center mt-3 gap-2 p-2 bg-white border rounded-md shadow-md hover:bg-gray-100"
              >
                <!-- User Icon -->
                <div class="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <img
                      v-if="profileImage"
                      :src="profileImage"
                      alt="User Icon"
                      class="absolute w-6 h-6 object-cover"
                    />
                    <svg
                      v-else
                      class="absolute w-8 h-8 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                <!-- Dynamic User Name -->
                <span>{{ firstName }} {{ lastName }}</span>
                <i class="fa fa-caret-down"></i>
              </button>

              <!-- Dropdown Content -->
              <div
                class="dropdown-content absolute right-1 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 hidden"
              >
                <a
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  @click="goToUserProfile"
                >
                  Profile
                </a>
                <a
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  @click="logout"
                >
                  Logout
                </a>
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
      stage_link: "https://aapistage.newalchemysolutions.com", // API URL
      loading: false, // Loading state for logout
      firstName: "", // First name
      lastName: "", // Last name
      profileImage: "",
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path.toLowerCase() === "/login";
    },
  },
  mounted() {
  this.updateUserData();
  window.addEventListener("storage", this.updateUserData); // Listen to storage changes
},
beforeUnmount() {
  window.removeEventListener("storage", this.updateUserData); // Clean up listener
},

methods: {
  updateUserData() {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const profileImage = localStorage.getItem("profile_image");
    console.log("Retrieved from localStorage:", { firstName, lastName, profileImage }); // Debug log
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (profileImage) this.profileImage = profileImage; // Update profile image
  },
    async logout() {
      this.loading = true;
      try {
        const headers = JSON.parse(localStorage.getItem("headers"));
        const response = await axios.delete(`${this.stage_link}/logout`, {
          headers,
        });
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
    goToUserProfile() {
      this.$router.push("/profile"); // Navigate to UserProfile page
    },
  },
  mounted() {
    this.updateUserData();
  },
  watch: {
    $route() {
      this.updateUserData();
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
  display: none;
  z-index: 10;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
