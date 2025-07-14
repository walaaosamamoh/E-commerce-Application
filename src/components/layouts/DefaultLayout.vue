<template>
  <!-- i've added min-h-screen  -->
  <div class="min-h-screen flex flex-col">
    <header class="text-white shadow bg-blue-500 p-5 flex gap-2 justify-between items-center">
      <div class="flex items-center gap-2">
        <img
          class="w-12 h-12 ml-4 rounded-full"
          src="/src/assets/images/BlueCart_logo.jpg"
          alt=""
        />
        <span class="text-2xl font-bold">BlueCart</span>
      </div>

      <div class="flex items-center gap-4">
        <!-- dropdown language menue -->
        <select
          v-model="$i18n.locale"
          class="bg-blue-500 text-white rounded py-1 px-2 cursor-pointer outline-none"
          @change="document.dir = $i18n.locale === 'ar' ? 'rtl' : 'ltr'"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
        <span class="material-icons cursor-pointer hover:text-red-500 transition" @click="logOut">
          logout
        </span>
      </div>
    </header>
    <main class="flex-1">
      <router-view :key="$route.fullPath" />
    </main>
    <footer class="bg-gray-800 text-white p-8 text-center mt-6 ">
      <p>&copy; 2025 BlueCart. {{$t('footer.rights')}}.</p>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      if (confirm('Are you sure you want to log out?')) {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        // Redirect to login page
        this.$router.push({ name: 'login' })
      }
    },
  },
}
</script>
