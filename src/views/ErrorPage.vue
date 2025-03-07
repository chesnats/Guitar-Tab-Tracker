<template>
 <div class="flex-col flex items-center justify-center mt-28"
  style="background-image: url('https://source.unsplash.com/random/1920x1080?nature')">

  <div class="max-w-4xl mx-auto text-center bg-opacity-90 backdrop-blur-lg p-10  rounded-lg shadow-lg">
    <div class="text-[14rem]  font-bold text-orange-600 mb-4">404</div>
    <h1 class="text-4xl font-bold text-gray-300 mb-6">Oops! Page Not Found</h1>
    <p class="text-lg text-gray-400 mb-8">The page you're looking for seems to have gone on a little adventure. Don't
      worry, we'll help you find your way back home.</p>
    <router-link  class="inline-block bg-orange-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-700 transition-colors duration-300" to="/" >Go to Home</router-link>
  </div>
 </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>
