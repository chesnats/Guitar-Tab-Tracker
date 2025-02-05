<template>
  <div class="mt-40 flex items-center justify-center">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
    >
      <div class="flex flex-col items-center">
        <!-- Replace Spinner with GIF -->
        <img src="../assets/loading.gif" alt="Loading..." class="h-70 w-70" />
      </div>
    </div>

    <!-- Login Form -->
    <div class="relative rounded-3xl bg-gray-400 sm:p-20 sm:max-w-xl w-full ">
      <div>
        <h2
          class="text-center text-3xl/10 font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <div class="mt-10">
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label
              for="username"
              class="block text-sm/6 font-medium text-gray-900"
              >Username</label
            >
            <input
              v-model="username"
              id="username"
              type="text"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
            <input
              v-model="password"
              id="password"
              type="password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      stage_link: "https://aapistage.newalchemysolutions.com",
      username: "", // Initialize username
      password: "", // Initialize password
      loading: false, // State for loading
    };
  },
  methods: {
async login() {
  this.loading = true; // Start loading
  try {
    const payload = {
      user_id: this.username,
      password: this.password,
    };
    const headers = {
      "Content-Type": "application/json",
      Gui: "Verification",
    };

    const response = await axios.post(`${this.stage_link}/login`, payload, {
      headers,
    });

    if (response.status === 200) {
      console.log(response);

      // Save data to localStorage
      const userData = response?.data?.data;
      const { first_name, last_name } = userData;

      localStorage.setItem("login_time", new Date().toISOString());
      localStorage.setItem("login_user", this.username);
      localStorage.setItem("first_name", first_name || "");
      localStorage.setItem("last_name", last_name || "");
      localStorage.setItem("login_message", "User successfully logged in.");
      localStorage.setItem("login_data", JSON.stringify(userData));

      const authorization = `Bearer ${response.data.meta.access_token}`;
      headers.Authorization = authorization;

      localStorage.setItem("headers", JSON.stringify(headers));

      // Redirect to home
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.response?.data?.meta?.message || "Invalid username or password!";
    alert(errorMessage);
  } finally {
    this.loading = false; // End loading
  }
},
  },
};
</script>
