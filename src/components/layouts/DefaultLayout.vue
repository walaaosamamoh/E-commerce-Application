<template>
    <div>
      <header class="bg-blue-500 shadow text-white p-4 flex gap-2 justify-center items-center">
        <img class="w-12 h-12 ml-4 rounded-full" 
        src="/src/assets/images/BlueCart_logo.jpg" alt="">
        <h1 class="text-2xl font-bold">BlueCart</h1>
      </header>
      <main>
        <router-view :key="$route.fullPath"/>
      </main>
      <footer class="bg-gray-800 text-white p-4 mt-6 text-center">
        <p>&copy; 2023 E-commerce Application. All rights reserved.</p>
      </footer>
    </div>
</template>

<script>

    export default {
        
    }
</script>