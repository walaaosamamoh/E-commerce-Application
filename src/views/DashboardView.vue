<template>
  <div class="flex flex-col gap-4 items-center justify-center absolute top-1/2 left-1/2 translate-[-50%]">
    <div class="flex items-center gap-4 bg-blue-500 cursor-pointer font-bold w-[300px] px-2 py-3 rounded shadow-xl
    text-white active:shadow-sm active:translate-y-1 transition" 
    @click="manageCategories">
      <i  class="material-icons">category</i>
      <span class="text-xl">Manage Categories</span>
    </div>
    <div class="flex items-center gap-4 bg-blue-500 cursor-pointer font-bold w-[300px] px-2 py-3 rounded shadow-xl
    text-white active:shadow-sm active:translate-y-1 transition"
    @click="manageProducts">
      <i class="material-icons">storefront</i>
      <span class="text-xl">Manage Products</span>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      manageCategories() {
        this.$router.push({ name: 'manage-categories' });
      },
      manageProducts() {
        this.$router.push({ name: 'manage-products' });
      }
    }
  }
</script>
