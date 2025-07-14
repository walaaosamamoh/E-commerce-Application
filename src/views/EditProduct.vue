<template>
  <div class="p-5">
    <button @click="this.$router.back"
    class="ml-4 shadow mb-4 cursor-pointer flex p-2 rounded bg-blue-500">
      <span class="material-icons text-white">{{ $t('buttons.backButton') }}</span>
    </button>
  </div>
   <!-- loading -->
    <div v-if="shopStore.loading || !formReady" class="flex items-center justify-center min-h-screen bg-white">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  <div v-else>
    <ProductForm
      :key= "$route.params.id"
      :initial-values="formValues"
      :submit-text="$t('admin.update-product')"
      @submit="handleUpdate"
      :categories="shopStore.categories"
    />
  </div>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue'
import { useShopStore } from '@/stores/shop'
import { useToast } from 'vue-toastification'
  export default {
    components: {
      ProductForm
    },
    data() {
      return {
        shopStore: useShopStore(),
        toast: useToast(),
        formReady: false,
        formValues: {
          name: '',
          price: '',
          description: '',
          category: '',
          image: ''
        }
      }
    },
    methods:{
      async fetchProductData() {
        const productId = this.$route.params.id
        await this.shopStore.fetchProduct(productId)
        const product = this.shopStore.currentProduct
        if (this.shopStore.error) {
          this.toast.error(this.shopStore.error)
          return
        }
        this.formValues = {
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.categoryId || '',
          image: product.image
        }
        // show form after the data be ready
        this.formReady = true
      },
      async handleUpdate(values) {
        await this.shopStore.updateProduct({
          id: this.$route.params.id,
          name: values.name,
          price: Number(values.price),
          description: values.description,
          image: values.image,
          categoryId: parseInt(values.category)
        })
        if (this.shopStore.error) {
          this.toast.error(this.shopStore.error, {
            timeout: 2000,
            position: 'top-right',
          })
          return
        }
        this.toast.success('Product updated successfully', {
          timeout: 2000,
          position: 'top-right',
        }),
        this.$refs.form.resetForm()
    }
  },
    async mounted() {
      await this.shopStore.fetchData()
      await this.fetchProductData()
    }
  }
</script>
