<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold text-gray-800">Tab Tracker</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-gray-900">Home</router-link>
            <router-link to="/create" class="text-gray-600 hover:text-gray-900">Create</router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>