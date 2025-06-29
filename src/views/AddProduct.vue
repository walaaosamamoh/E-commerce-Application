<template>
  <div class="p-5">
    <button @click="this.$router.back"
    class="ml-4 shadow mb-4 cursor-pointer flex p-2 rounded bg-gray-700">
      <span class="material-icons text-white">arrow_back</span>
    </button>
  </div>
  <NewProductForm/>
</template>

<script>
import NewProductForm from '../components/NewProductForm.vue'
export default{
   components:{
    NewProductForm
  }
}
</script>