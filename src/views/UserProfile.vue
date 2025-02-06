<template>
<div class="lg:w-[70%] md:w-[90%] w-[96%] mx-auto flex gap-4">
  <div class="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-9 rounded-xl h-fit self-center dark:bg-white">
    <div class="">
          <div id="profilePreview" class="mx-auto flex mt-2 justify-center w-[141px] h-[141px]  bg-center bg-no-repeat">
            <div
              id="profilePreview"
              :style="{ backgroundImage: profileImagePreview ? `url(${profileImagePreview})` : '' }"
              class="mx-auto flex mt-2 justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat">

              <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                <input
                  type="file"
                  name="profile"
                  id="upload_profile"
                  hidden
                  required
                  @change="handleImageUpload"
                />
                <label for="upload_profile">
                  <svg
                    data-slot="icon"
                    class="w-6 h-5"
                    fill="none"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <h1 class="lg:text-3xl pt-5 font-bold md:text-2xl text-xl text-center mb-2 dark:text-black">{{ firstName }} {{ lastName }}</h1>
      <form @submit.prevent="updateProfile" @keydown.enter="updateProfile" class="space-y-4">
        <div class="flex flex-col justify-center w-full">
            <!-- First Name -->
            <div class="w-full  mb-4 mt-3">
              <label for="first_name" class="mb-2 dark:text-gray-900">First Name</label>
              <input type="text"
                v-model="firstName"
                id="first_name"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
                required
              />
            </div>

            <!-- Last Name -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="last_name" class="mb-2 dark:text-gray-900">Last Name</label>
              <input type="text"
                v-model="lastName"
                id="last_name"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
                required
              />
            </div>

            <!-- Username -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="username" class="mb-2 dark:text-gray-900">Username</label>
              <input
                v-model="username"
                id="username"
                type="text"
                class="px-4  w-full py-2 rounded-lg border bg-gray-300 border-gray-300"
                disabled
              />
              <p class="text-sm text-gray-500 mt-1">Username cannot be changed.</p>
            </div>

            <!-- Job Position -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="job_position" class="mb-2 dark:text-gray-900">Job Position</label>
              <input
                v-model="jobPosition"
                id="job_position"
                type="text"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
              />
            </div>
          <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
            <!-- Address -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="address" class="mb-2 dark:text-gray-900">Address</label>
              <input
                v-model="address"
                id="address"
                type="text"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
              />
            </div>

            <!-- Department -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="department" class="mb-2 dark:text-gray-900">Department</label>
              <input
                v-model="department"
                id="department"
                type="text"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
              />
            </div>
          </div>
          <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
            <!-- Primary Email -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="primary_email" class="mb-2 dark:text-gray-900">Primary Email</label>
              <input
                v-model="primaryEmail"
                id="primary_email"
                type="email"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
                required
              />
            </div>

            <!-- Secondary Email -->
            <div class="w-full  mb-4 lg:mt-3">
              <label for="secondary_email" class="mb-2 dark:text-gray-900">Secondary Email</label>
              <input
                v-model="secondaryEmail"
                id="secondary_email"
                type="email"
                class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300"
              />
            </div>
          </div>
            <!-- Save Button -->
            <div>
              <button
                @click="updateProfile"
                class="w-full rounded-lg bg-blue-500 mt-5 text-white text-lg font-semibold h-12"
              >
                Save Changes
              </button>
            </div>
            </div>
        </form>
    </div>
  </div>
 </div>
</template>
<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      jobPosition: "",
      address: "",
      department: "",
      primaryEmail: "",
      secondaryEmail: "",
      apiUrl: "https://aapistage.newalchemysolutions.com",
      profileImagePreview: "", 
    };
  },
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      // Load user data from localStorage
      this.firstName = localStorage.getItem("first_name") || "";
      this.lastName = localStorage.getItem("last_name") || "";
      this.username = localStorage.getItem("login_user") || "";
      this.jobPosition = localStorage.getItem("job_position") || "";
      this.address = localStorage.getItem("address") || "";
      this.department = localStorage.getItem("department") || "";
      this.primaryEmail = localStorage.getItem("primary_email") || "";
      this.secondaryEmail = localStorage.getItem("secondary_email") || "";
      this.profileImagePreview =
        localStorage.getItem("profile_image") || ""; 
    },

    async updateProfile() {
      try {
        // Fetch Authorization token from localStorage
        const headers = JSON.parse(localStorage.getItem("headers")) || {};

        // Validate headers
        if (!headers.Authorization) {
          alert("Authorization token is missing. Please log in again.");
          return;
        }

        // API Payload
        const payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          job_position: this.jobPosition || null,
          address: this.address || null,
          department: this.department || null,
          primary_email: this.primaryEmail,
          secondary_email: this.secondaryEmail || null,
        };

        // Make API call using PATCH
        const response = await axios.patch(`${this.apiUrl}/user_profile`, payload, { headers });

        // Handle success
        if (response.status === 200 || response.status === 201) {
          alert("Profile updated successfully!");

          // Save updated data to localStorage
          Object.entries(payload).forEach(([key, value]) => {
            localStorage.setItem(key, value || "");
          });
        }

      } catch (error) {
        console.error("Failed to update profile:", error);

        const errorMessage =
          error.response?.data?.meta?.message ||
          error.response?.data?.message ||
          "An error occurred while updating the profile.";
        alert(errorMessage);
      }
    },

    // Handle image upload and preview
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImagePreview = e.target.result; 
          localStorage.setItem("profile_image", this.profileImagePreview); 
        };
        reader.readAsDataURL(file); 
      }
    },
  },
};
</script>

