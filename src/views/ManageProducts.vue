<template>
  <div class="p-5">
    <!-- header -->
    <div class="flex items-center mx-4 mb-12 ">
      <button @click="this.$router.back"
    class="shadow cursor-pointer flex p-2 rounded bg-gray-700">
      <span class="material-icons text-white">arrow_back</span>
    </button>
    <h1 class="flex-1 text-2xl font-bold text-center">Products</h1>
    </div>
    <!-- main -->
    <div class="lg:w-[65%] lg:m-auto overflow-x-auto">
      <!-- Add Product Button -->
      <div class="flex justify-end mb-4">
      <button @click="this.$router.push({name: 'add-product'})"
      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
        Add New Product
      </button>
      </div>
      <!-- table -->
      <table class="w-full lg:m-auto border-collapse">
        <thead>
          <tr>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">ID</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">Name</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">Price</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">Category</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200"> Image</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in shopStore.sortedProducts" :key="product.id">
            <td class="border border-[#ddd] p-2 text-center">{{product.id}}</td>
            <td class="border border-[#ddd] p-2 text-center">{{product.name}}</td>
            <td class="border border-[#ddd] p-2 text-center">${{product.price}}</td>
            <td class="border border-[#ddd] p-2 text-center">{{getCategoryName(product.categoryId)}}</td>
            <td class="border border-[#ddd] p-2 text-center">
              <img :src="product.image" :alt="product.name"/>
            </td>
            <td class="border border-[#ddd] p-2 text-sm text-center">
              <div class=" flex flex-wrap gap-2 justify-center items-center">
                <button 
                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                Edit
                </button>
                <button
                class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                View
                </button>  
                <button @click.stop="handleDelete(product.id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Delete
              </button>
              </div>
            </td>
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
  },
  methods:{
    getCategoryName(categoryId){
      const category = this.shopStore.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown';
    },
    async handleDelete(id){
      if(confirm('Are you sure you want to delete this product?')){
        await this.shopStore.deleteProduct(id)
        if(this.shopStore.error){
          alert(this.shopStore.error)
          return
        }
      }
    }
  }
}
</script>