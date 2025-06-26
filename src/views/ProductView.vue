<template>
  <div v-if="currentProduct && !loading" class="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl my-8">
    <button @click="goBack"
    class="shadow mb-4 cursor-pointer flex p-2 rounded bg-blue-500">
      <span class="material-icons text-white">arrow_back</span>
    </button>
    <img
      :src="currentProduct.image"
      :alt="currentProduct.name"
      class="w-full h-80 object-cover mb-8 mx-auto"
    />
    <p class="font-semibold text-2xl mb-2">{{ currentProduct.name }}</p>
    <p class="text-lg mb-2">${{ currentProduct.price }}</p>
    <p >{{ currentProduct.description }}</p>
    <!-- comments section -->
    <div class="flex flex-col md:flex-row justify-around items-center my-8">
      <div>
        <textarea class="border border-gray-500 w-70 h-20 mt-5 p-2 focus:outline-none" placeholder="Write a comment"></textarea>
        <button class="block border bg-blue-700 rounded text-white px-3 py-1 mx-auto cursor-pointer">submit</button>
      </div>
      <hr class="md:w-[1px] w-full h-[1px] md:h-[120px] border-none bg-gray-400 mt-2"/>
      <div>
      <h3 class="mt-2 md:mt-0 mb-2 text-gray-800 text-lg"><strong>Comments:</strong></h3>
      <ul class="ml-4 list-disc text-gray-600 ">
        <li v-for="comment in getCommentsByProduct(currentProduct.id)" :key="comment.id">
          {{ comment.text }}
        </li>
      </ul>
    </div>
    </div>
  </div>
   <!-- loading -->
    <div v-else class="flex items-center justify-center min-h-screen bg-white">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
</template>

<script>
import { useShopStore } from '@/stores/shop'
import { mapState , mapActions} from 'pinia'
export default {
  computed: {
    ...mapState(useShopStore, ['currentProduct','getProductById','getCommentsByProduct','loading']),
  },
  methods:{
    ...mapActions(useShopStore, ['fetchProduct']),

    goBack(){
      this.$router.back()
    }
  },
  created(){
    this.fetchProduct(this.$route.params.id)
    this.getCommentsByProduct(this.$route.params.id)
  },
  watch: {
    '$route.params.id':{
      handler(newId){
        this.getCommentsByProduct(newId)
      }
    }
  }
}
</script>
