<template>
  <div class="max-w-screen-xl sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div class="flex flex-col items-center">
        <img src="/assets/5fe9a1430b395d6277e2dd6d40c3e4-unscreen.gif" alt="Loading..." class="h-70 w-70" />
      </div>
    </div>

    <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div class="mt-12 flex flex-col items-center">
        <h1 class="text-2xl xl:text-3xl font-extrabold">
          {{ showRegisterForm ? 'Register' : 'Sign In' }}
        </h1>
        <div class="w-full flex-1 mt-2">
          <img class="w-10/12 p-6 mb-5 px-10 ml-8" src="/assets/e3012ac561970bf88fb4fdf4f52c1489.jpg" alt="guitar">

          <!-- Sign In Form -->
          <form @submit.prevent="login" @keydown.enter="login" v-if="!showRegisterForm" class="space-y-6">
            <div class="mx-auto max-w-xs">
              <input
                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                v-model="username"
                id="username"
                placeholder="Email"
                required
              />
              <input
                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                v-model="password"
                id="password"
                type="password"
                placeholder="Password"
                required
              />
              <button
                :disabled="!isSignInFormValid || loading"
                class="mt-12 tracking-wide font-semibold w-full py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                :class="{
                  'bg-orange-400 hover:bg-orange-600 text-gray-100': isSignInFormValid && !loading,
                  'bg-gray-300 cursor-not-allowed text-gray-500': !isSignInFormValid || loading,
                }"
              >
                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3">Sign In</span>
              </button>
              <p class="mt-4 text-sm text-center">
                Don't have an account?
                <button @click="toggleForm" class="text-blue-600 hover:underline">Register Here</button>
              </p>
            </div>
          </form>

          <!-- Register Form -->
          <form v-if="showRegisterForm" @submit.prevent="register" class="space-y-6">
            <div class="mx-auto max-w-xs">
              <input
                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                v-model="username"
                id="username"
                placeholder="Email"
                required
              />
              <input
                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                v-model="password"
                id="password"
                type="password"
                placeholder="Password"
                required
              />
              <input
                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                v-model="confirmpassword"
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                required
              />
              <button
                :disabled="!isRegisterFormValid || loading"
                class="mt-12 tracking-wide font-semibold w-full py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                :class="{
                  'bg-orange-400 hover:bg-orange-600 text-gray-100': isRegisterFormValid && !loading,
                  'bg-gray-300 cursor-not-allowed text-gray-500': !isRegisterFormValid || loading,
                }"
              >
                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3">Register</span>
              </button>
              <p class="mt-4 text-sm text-center">
                Already have an account?
                <button @click="toggleForm" class="text-blue-600 hover:underline">Login Here</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-indigo-100 text-center hidden lg:flex sm:rounded-lg">
      <div class="w-full h-full bg-cover bg-center bg-no-repeat rounded-tr-lg rounded-br-lg"
        style="background-image: url('/assets/9db8b0e441fd29f593a663a8a5b76562.gif');">
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth } from "../firebaseApp"; // Import Firebase auth methods

export default {
  name: "LoginPage",
  data() {
    return {
      username: "", // This will be your email
      password: "",
      confirmpassword: "",
      loading: false,
      showRegisterForm: false,
    };
  },
  computed: {
    // Validate Sign In Form
    isSignInFormValid() {
      return this.username.trim() !== "" && this.password.trim() !== "";
    },
    // Validate Register Form
    isRegisterFormValid() {
      return (
        this.username.trim() !== "" &&
        this.password.trim() !== "" &&
        this.confirmpassword.trim() !== "" &&
        this.password === this.confirmpassword
      );
    },
  },
  methods: {
    toggleForm() {
      this.showRegisterForm = !this.showRegisterForm;
      // Clear form fields when toggling
      this.username = "";
      this.password = "";
      this.confirmpassword = "";
    },
    async register() {
      if (!this.isRegisterFormValid) {
        alert("Please fill out all fields correctly.");
        return;
      }

      this.loading = true;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.username, this.password);
        const user = userCredential.user;
        console.log("User registered:", user);

        alert("Account created successfully! Please log in.");
        this.$router.push("/login"); // Redirect after registration
      } catch (error) {
        console.error("Error registering:", error);
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
    async login() {
      if (!this.isSignInFormValid) {
        alert("Please fill out all fields.");
        return;
      }

      this.loading = true;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.username, this.password);
        const user = userCredential.user;
        console.log("User logged in:", user);

        // Save user info to localStorage
        localStorage.setItem("login_user", user.email);
        localStorage.setItem("login_message", "User successfully logged in.");

        // Redirect to home
        this.$router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>