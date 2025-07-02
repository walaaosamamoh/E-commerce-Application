<template>
    <div class="min-h-screen flex flex-col">
      <header class="text-white shadow bg-blue-500 p-5 flex gap-2 justify-between items-center">
        <div class="flex items-center gap-2 ">
          <img class="w-12 h-12 ml-4 rounded-full" 
           src="/src/assets/images/BlueCart_logo.jpg" alt="">
          <span class="text-2xl font-bold">BlueCart</span>
        </div>
        <span class="material-icons cursor-pointer hover:text-red-500 transition">logout</span>
      </header>
      <main>
        <router-view :key="$route.fullPath"/>
      </main>
      <footer class="bg-gray-800 text-white p-4 mt-6 text-center">
        <p>&copy; 2025 BlueCart. All rights reserved.</p>
      </footer>
    </div>
</template>

<script>

    export default {
        
    }
</script>