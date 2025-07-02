<template>
  <div class="min-h-screen flex flex-col">
    <header class="text-white shadow bg-blue-500 p-5 flex gap-2 justify-between items-center">
        <div class="flex items-center gap-2 ">
          <img class="w-12 h-12 ml-4 rounded-full" 
           src="/src/assets/images/BlueCart_logo.jpg" alt="">
          <span class="text-2xl font-bold">BlueCart</span>
        </div>
        <span class="material-icons cursor-pointer hover:text-red-500 transition"
        @click="logOut">
          logout
        </span>
      </header>
    <main class="flex-2">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      if (confirm('Are you sure you want to log out?')) {
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>
