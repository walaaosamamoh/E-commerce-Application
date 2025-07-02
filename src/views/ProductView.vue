<template>
  <div v-if="currentProduct && !loading" class="mx-2">
    <button @click="goBack"
    class="m-4 shadow mb-4 cursor-pointer flex p-2 rounded bg-blue-500">
      <span class="material-icons text-white">arrow_back</span>
    </button>
    <!-- product details -->
    <div class="max-w-md mx-auto bg-white rounded overflow-hidden md:max-w-2xl my-8 px-2">
      <img
      :src="currentProduct.image"
      :alt="currentProduct.name"
      class="w-full h-80 object-cover mb-8 mx-auto"
    />
    <p class="font-semibold text-2xl mb-2">{{ currentProduct.name }}</p>
    <p class="text-lg mb-2">${{ currentProduct.price }}</p>
    <p >{{ currentProduct.description }}</p>
    </div>
    <!-- comments section -->
    <div class="flex flex-col md:flex-row gap-4 justify-around items-center my-8">
      <!-- add comment -->
      <div v-if="user.roleID==='user'" class="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg shadow">
        <textarea  v-model="newComment"
        class="border border-gray-400 w-full h-md mt-5 p-2 focus:outline-none" placeholder="Write a comment"></textarea>
        <button @click="addComment" class="block border bg-blue-700 rounded text-white px-3 py-1 mx-auto cursor-pointer w-full">submit</button>
      </div>
      <!-- comments -->
      <div class="md:border-l md:border-l-gray-300 pl-4">
      <h3 class="mt-2 md:mt-0 mb-2 text-gray-800 text-lg"><strong>Comments:</strong></h3>
      <div class=" grid grid-cols-1 gap-4 text-gray-600 ">
        <div v-for="comment in getCommentsByProduct(currentProduct.id)" :key="comment.id"
        class="p-2 border border-gray-400 rounded-lg shadow text-wrap">
          {{ comment.text }}
        </div>
      </div>
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
  data(){
    return{
      newComment: '',
      productId: this.$route.params.id,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  computed: {
    ...mapState(useShopStore, ['comments','currentProduct','getProductById','getCommentsByProduct','loading']),
  },
  methods:{
    ...mapActions(useShopStore, ['fetchProduct','fetchData','createComment']),

    goBack(){
      this.$router.back()
    },

    async addComment(){
      if(!this.newComment.trim()) return;

        try{
          await this.createComment({
          id: this.comments.length + 1,
          text: this.newComment,
          productId: this.productId, 
          userId: this.user.id
          })
          this.newComment = ''
          this.getCommentsByProduct(this.productId)
        }catch(err){
          console.error('Error adding comment:', err);
          alert('Failed to add comment. Please try again later.');
        }
      
    }
  },
  created(){
    this.fetchProduct(this.productId);
    this.fetchData()
  },
}
</script>
