<template>
  <div class="p-5">
    <button @click="this.$router.back"
    class="ml-4 shadow mb-4 cursor-pointer flex p-2 rounded bg-blue-500">
      <span class="material-icons text-white">{{ $t('buttons.backButton') }}</span>
    </button>
  </div>
  <NewProductForm :categories="shopStore.categories"
  @submit="handleAddProduct" :submit-text="$t('admin.add-new-product')"/>
</template>

<script>
import NewProductForm from '../components/ProductForm.vue'
import { useShopStore } from '@/stores/shop'
import { useToast } from 'vue-toastification'

export default{
  components:{
    NewProductForm
  },
  data(){
    return{
      shopStore: useShopStore(),
      toast: useToast()
    }
  },
  methods: {
    async handleAddProduct( values ){
      const newProduct = {
        description: values.description,
        id: this.shopStore.products.length + 1,
        image: values.image,
        name: values.name,
        price: values.price,
        categoryId: parseInt(values.category),
      }
      this.shopStore.createProduct(newProduct)
      // show success or failed message
      if (this.shopStore.error) {
        this.toast.error(this.shopStore.error, {
          timeout: 2000,
          position: 'top-right',
        })
      }
      this.toast.success('Product added successfully', {
        timeout: 2000,
        position: 'top-right',
      })
    },
  },
  async mounted() {
    await this.shopStore.fetchData()
  }
}
</script>
