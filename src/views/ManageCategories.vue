<template>
  <div class="p-5">
    <div class="flex items-center mx-4 mb-12">
      <button @click="this.$router.back"
      class="md:m-4 shadow cursor-pointer flex p-2 rounded bg-blue-500">
      <span class="material-icons text-white">arrow_back</span>
      </button>
      <h1 class="flex-1 text-2xl font-bold text-center absolute left-1/2 transform translate-x-[-50%]">Categories</h1>
    </div>
    <!-- loading -->
    <div v-if="shopStore.loading" class="flex items-center justify-center min-h-screen bg-white">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div>
      <table class="w-full lg:w-1/2 lg:m-auto border-collapse">
        <thead>
          <tr>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">ID</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in shopStore.categories" :key="category.id">
            <td class="border border-[#ddd] p-2 text-center">{{category.id}}</td>
            <td class="border border-[#ddd] p-2 text-center">{{category.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {useShopStore} from '@/stores/shop'
export default{
  data(){
    return{
      shopStore: useShopStore()
    }
  },
  mounted(){
    this.shopStore.fetchData()
  }
}
</script>