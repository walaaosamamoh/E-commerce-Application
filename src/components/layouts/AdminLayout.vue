<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-700 text-white py-5 px-8 flex justify-between items-center">
    <h1 class="text-3xl font-bold ">Dashboard</h1>
    <span class="material-icons cursor-pointer hover:text-red-500 transition">logout</span>
  </header>
  <main class="flex-2">
    <router-view />
  </main>
  </div>
</template>

<script>
  export default {
    
  }
</script>