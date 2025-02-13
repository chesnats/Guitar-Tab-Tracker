<template>
  <div class="lg:w-[100%] md:w-[90%] w-[96%] mx-auto flex gap-4">
    <div class="relative max-w-10xl mx-auto w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 form-container tuning-calculator">
      <section class="border-2 border-dashed border-gray-400 p-5 rounded-xl">
        <div id="profilePreview" class="mx-auto flex mt-2 justify-center w-[141px] h-[141px]  bg-center bg-no-repeat ">
          <div id="profilePreview" :style="{ backgroundImage: profileImagePreview ? `url(${profileImagePreview})` : '' }"
            class="mx-auto flex mt-2 justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat">
            <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4 cursor-pointer ">
              <input type="file" name="profile" id="upload_profile" hidden required @change="handleImageUpload" />
              <label for="upload_profile">
                <svg data-slot="icon" class="w-6 h-5" fill="none" stroke-width="1.5" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <h1 class="lg:text-3xl pt-5 font-bold md:text-2xl text-xl text-center mb-2 dark:text-black">{{ firstName }} {{ lastName }}</h1>
        
        <!-- Toggle button for profile and change password form -->
        <div class="text-center mb-4">
          <button @click="toggleForm" class="text-blue-500 hover:underline">
            {{ showChangePassword ? 'Back to Profile' : 'Change Password' }}
          </button>
        </div>

        <!-- User Profile Form -->
        <div v-if="!showChangePassword">
          <form @submit.prevent="updateProfile" @keydown.enter="updateProfile" class="space-y-4">
            <!-- Existing form fields for profile -->
            <div class="flex flex-col justify-center w-full">
               <!-- Firstname Field -->
              <div class="w-full  mb-4 mt-3">
                <label for="first_name" class="mb-2 dark:text-gray-900">First Name</label>
                <input type="text" v-model="firstName" id="first_name" class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300" required />
              </div>
              <!-- Lastname Field -->
              <div class="w-full  mb-4 lg:mt-3">
                <label for="last_name" class="mb-2 dark:text-gray-900">Last Name</label>
                <input type="text" v-model="lastName" id="last_name" class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300" required />
              </div>
              <!-- Username Field -->
              <div class="w-full  mb-4 lg:mt-3">
                <label for="username" class="mb-2 dark:text-gray-900">Username</label>
                <input v-model="username" id="username" type="text" class="px-4  w-full py-2 rounded-lg border bg-gray-300 border-gray-300" disabled />
                <p class="text-sm text-gray-500 mt-1">Username cannot be changed.</p>
              </div>
              <!-- Job Position Field -->
              <div class="w-full  mb-4 lg:mt-3">
                <label for="job_position" class="mb-2 dark:text-gray-900">Job Position</label>
                <input v-model="jobPosition" id="job_position" type="text" class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300" />
              </div>
              <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
              <!-- Address Field -->
              <div class="w-full mb-4 lg:mt-3">
                <label for="address" class="mb-2 dark:text-gray-900">Address</label>
                <input v-model="address" id="address" type="text" class="px-4 w-full py-2 rounded-lg border bg-gray-200 border-gray-300" />
              </div>

              <!-- Department Field -->
              <div class="w-full mb-4 lg:mt-3">
                <label for="department" class="mb-2 dark:text-gray-900">Department</label>
                <input v-model="department" id="department" type="text" class="px-4 w-full py-2 rounded-lg border bg-gray-200 border-gray-300" />
              </div>
              </div>
              <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
              <!-- Primary Email Field -->
              <div class="w-full mb-4 lg:mt-3">
                <label for="primary_email" class="mb-2 dark:text-gray-900">Primary Email</label>
                <input v-model="primaryEmail" id="primary_email" type="email" class="px-4 w-full py-2 rounded-lg border bg-gray-200 border-gray-300" />
              </div>

              <!-- Secondary Email Field -->
              <div class="w-full mb-4 lg:mt-3">
                <label for="secondary_email" class="mb-2 dark:text-gray-900">Secondary Email</label>
                <input v-model="secondaryEmail" id="secondary_email" type="email" class="px-4 w-full py-2 rounded-lg border bg-gray-200 border-gray-300" />
              </div>
              </div>
              <!-- Save Button -->
              <div>
                <button type="submit" class="w-full rounded-lg bg-orange-200 mt-5 text-black text-lg font-semibold h-12 transition-all duration-500 hover:bg-orange-400">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Change Password Form -->
        <div v-if="showChangePassword">
          <form @submit.prevent="changePassword" class="space-y-4">
            <div class="w-full  mb-4 mt-3">
              <label for="old_password" class="mb-2 dark:text-gray-900">Old Password</label>
              <input type="password" v-model="oldPassword" id="old_password" class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300" required />
            </div>

            <div class="w-full  mb-4 lg:mt-3">
              <label for="new_password" class="mb-2 dark:text-gray-900">New Password</label>
              <input type="password" v-model="newPassword" id="new_password" class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300" required />
            </div>

            <div class="w-full  mb-4 lg:mt-3">
              <label for="confirm_password" class="mb-2 dark:text-gray-900">Confirm New Password</label>
              <input type="password" v-model="confirmPassword" id="confirm_password" class="px-4  w-full py-2 rounded-lg border bg-gray-200 border-gray-300" required />
            </div>

            <div>
              <button type="submit" class="w-full rounded-lg bg-orange-200 mt-5 text-black text-lg font-semibold h-12 transition-all duration-500 hover:bg-orange-400">
                Change Password
              </button>
            </div>
          </form>
        </div>

      </section>
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
      profileImagePreview: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showChangePassword: false,
      apiUrl: "https://aapistage.newalchemysolutions.com",
    };
  },
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      this.firstName = localStorage.getItem("first_name") || "";
      this.lastName = localStorage.getItem("last_name") || "";
      this.username = localStorage.getItem("login_user") || "";
      this.jobPosition = localStorage.getItem("job_position") || "";
      this.address = localStorage.getItem("address") || "";
      this.department = localStorage.getItem("department") || "";
      this.primaryEmail = localStorage.getItem("primary_email") || "";
      this.secondaryEmail = localStorage.getItem("secondary_email") || "";
      this.profileImagePreview = localStorage.getItem("profile_image") || ""; 
    },

    toggleForm() {
      this.showChangePassword = !this.showChangePassword;
      // Reset password fields when toggling back
      if (!this.showChangePassword) {
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      }
    },

    async updateProfile() {
  try {
    const headers = JSON.parse(localStorage.getItem("headers")) || {};
    if (!headers.Authorization) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    const payload = {
      first_name: this.firstName,
      last_name: this.lastName,
      job_position: this.jobPosition || null,
      address: this.address || null,
      department: this.department || null,
      primary_email: this.primaryEmail,
      secondary_email: this.secondaryEmail || null,
    };

    const response = await axios.post(`${this.apiUrl}/user_profile`, payload, { headers });

    if (response.status === 200 || response.status === 201) {
      alert("Profile updated successfully!");
      Object.entries(payload).forEach(([key, value]) => {
        localStorage.setItem(key, value || "");
      });
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    const errorMessage = error.response?.data?.message || "An error occurred while updating the profile.";
    alert(errorMessage);
  }
},

async changePassword() {
  try {
    if (this.newPassword !== this.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    const headers = JSON.parse(localStorage.getItem("headers")) || {};
    if (!headers.Authorization) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    const payload = {
      old_password: this.oldPassword,
      new_password: this.newPassword,
    };

    const response = await axios.post(`${this.apiUrl}/change_password`, payload, { headers });

    if (response.status === 200) {
      alert(response.data.message || "Password changed successfully!");
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.toggleForm();
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while changing the password.";
    alert(errorMessage);
  }
},

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
<style scoped>
.form-container {
  position: relative;
  background-color: white;
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1;
}

.form-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('src/assets/8F79kQbX2r4YhRG1k3-ezgif.com-video-to-gif-converter.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.2;
  z-index: -1;
  border-radius: inherit;
}

</style>