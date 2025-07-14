<template>
  <div class="flex flex-col gap-5 items-center justify-center absolute top-1/2 left-1/2 translate-[-50%]">
    <div class="flex items-center gap-4 bg-white border border-blue-500 cursor-pointer font-bold w-[300px] px-2 py-3 rounded shadow-xl
    text-blue-600 active:shadow-sm active:translate-y-1 transition" 
    @click="manageCategories">
      <i class="material-icons">category</i>
      <span class="text-xl">{{ $t('admin.manage-categories') }}</span>
    </div>
    <div class="flex items-center gap-4 bg-white border border-blue-500 cursor-pointer font-bold w-[300px] px-2 py-3 rounded shadow-xl
    text-blue-600 active:shadow-sm active:translate-y-1 transition"
    @click="manageProducts">
      <i class="material-icons">inventory_2</i>
      <span class="text-xl">{{ $t('admin.manage-products') }}</span>
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
