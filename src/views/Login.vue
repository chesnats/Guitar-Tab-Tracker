<template>
    <div class="max-w-screen-xl  sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
    >
      <div class="flex flex-col items-center">
        <!-- Replace Spinner with GIF -->
        <img src="/assets/5fe9a1430b395d6277e2dd6d40c3e4-unscreen.gif" alt="Loading..." class="h-70 w-70" />
      </div>
    </div>
    
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      
            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div class="w-full flex-1 mt-8">
                  <div class="flex flex-col items-center">
                    
                      <!-- Google Signup Button -->
                      <button
                        @click="redirectToGoogle"
                        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                        <div class="bg-white p-2 rounded-full">
                          <svg class="w-4" viewBox="0 0 533.5 544.3">
                            <path
                              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                              fill="#4285f4" />
                            <path
                              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                              fill="#34a853" />
                            <path
                              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                              fill="#fbbc04" />
                            <path
                              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                              fill="#ea4335" />
                          </svg>
                        </div>
                        <span class="ml-4">
                          Sign Up with Google
                        </span>
                      </button>

                      <!-- Facebook Signup Button -->
                      <button
                        @click="redirectToFacebook"
                        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-400 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg hover:bg-blue-500 focus:shadow-sm focus:shadow-outline mt-5">
                        <div class="bg-white p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" />
                            <path
                              d="M15.12 12.252h-2.003v7.281h-2.954v-7.281h-1.413v-2.425h1.413V8.641c0-1.61.47-3.048 2.986-3.048h2.062v2.278h-1.422c-.19 0-.458.096-.458.524v1.43h1.859l-.07 2.425z"
                              fill="white" />
                          </svg>
                        </div>
                        <span class="ml-4">
                          Sign Up with Facebook
                        </span>
                      </button>
                    </div>

                    <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with Username
                        </div>
                    </div>
                    <form @submit.prevent="login" @keydown.enter="login" v-if="!showRegisterForm" class="space-y-6">

                      <div class="mx-auto max-w-xs">
                          <input
                              class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="text"
                              v-model="username"
                              id="username"
                              placeholder="Username" />
                          <input
                              class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              v-model="password"
                              id="password"
                              type="password"
                              placeholder="Password" />
                          <button
                              class="mt-12 tracking-wide font-semibold bg-orange-400 hover:bg-orange-600 text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                              <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                  <circle cx="8.5" cy="7" r="4" />
                                  <path d="M20 8v6M23 11h-6" />
                              </svg>
                              <span
                              :disabled="loading"
                              class="ml-3"
                              type="submit"
                              >
                                  Sign Up
                              </span>
                          </button>
                          <p class="mt-4 text-sm text-center">
                              Don't have an account?
                              <button @click="toggleForm" class="text-blue-600 hover:underline">Register Here</button>
                            </p>
                      </div>
                      </form>
                      <form v-if="showRegisterForm" @submit.prevent="register" class="space-y-6">

                        <div class="mx-auto max-w-xs">
                            <input
                                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                v-model="username"
                                id="username"
                                placeholder="Username" />
                            <input
                                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                v-model="confirmpassword"
                                id="confirm-password"
                                type="password"
                                placeholder="Password" />
                            <input
                                class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                v-model="password"
                                id="password"
                                type="password"
                                placeholder="Confirm Password" />
                            <button
                                class="mt-12 tracking-wide font-semibold bg-orange-400 hover:bg-orange-600 text-gray-100 w-full py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span
                                :disabled="loading"
                                class="ml-3"
                                type="submit"
                                >
                                    Register
                                </span>
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
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      stage_link: "https://aapistage.newalchemysolutions.com",
      username: "", 
      password: "", 
      confirmPassword: "",
      loading: false,
      showRegisterForm: false,
    };
  },
methods: { 
  toggleForm() {
      this.showRegisterForm = !this.showRegisterForm;
    },
    async register() {
      console.log("Registering with", this.username, this.email, this.password);
    },
async login() {
  this.loading = true; 
  try {
    const payload = {
      user_id: this.username,
      password: this.password,
    };
    const headers = {
      "Content-Type": "application/json",
      Gui: "Verification",
    };

    const response = await axios.post(`${this.stage_link}/login`, payload, {headers,});

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
 // Method to redirect to Google signup page
 redirectToGoogle() {
      window.location.href = "https://accounts.google.com/signup"; // Replace with your actual Google signup URL
    },

    // Method to redirect to Facebook signup page
    redirectToFacebook() {
      window.location.href = "https://www.facebook.com/"; // Replace with your actual Facebook signup URL
    },
  },
};
</script>
