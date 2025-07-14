<template>
  <div class="p-5">
    <!-- header -->
    <div class="flex items-center mx-4 mb-12 ">
      <button @click="this.$router.back"
      class="shadow cursor-pointer flex p-2 rounded bg-blue-500">
      <span class="material-icons text-white">{{ $t('buttons.backButton') }}</span>
    </button>
    <h1 class="flex-1 text-2xl font-bold text-center absolute left-1/2 transform translate-x-[-50%]">{{$t('products.products')}}</h1>
    </div>
     <!-- loading -->
    <div v-if="shopStore.loading " class="flex items-center justify-center min-h-screen bg-white">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <!-- main -->
    <div v-else class="lg:w-[65%] lg:m-auto overflow-x-auto">
      <!-- Add Product Button -->
      <div class="flex justify-end mb-4">
      <button @click="this.$router.push({name: 'add-product'})"
      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
        {{ $t('admin.add-new-product') }}
      </button>
      </div>
      <!-- table -->
      <table class="w-full lg:m-auto border-collapse">
        <thead>
          <tr>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">{{ $t('admin.id') }}</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">{{$t('admin.name')}}</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">{{$t('admin.price')}}</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">{{$t('admin.category')}}</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200"> {{$t('admin.img')}}</th>
            <th class="border border-[#ddd] p-2 text-center bg-gray-200">{{$t('admin.actions')}}</th>
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
                <button  @click="this.$router.push({name:'edit-product', params:{id:product.id}})"
                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                {{ $t('admin.edit') }}
                </button>
                <button @click="this.$router.push({name:'product', params:{id:product.id}})"
                class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                {{ $t('admin.view') }}
                </button>
                <button @click="handleDelete(product.id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                {{ $t('admin.delete') }}
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
      return category ? this.$t(`categories.${category.name}`) : 'Unknown';
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
