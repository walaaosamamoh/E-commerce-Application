<template>
  <VeeForm
    @submit="addProduct"
    :validation-schema="schema"
    class="flex flex-col gap-2 max-w-sm mx-auto px-5 pb-5"
  >
    <div>
      <Field
        type="text"
        name="name"
        placeholder="Name"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="name" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        type="number"
        name="price"
        placeholder="Price"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="price" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        type="url"
        name="image"
        placeholder="Image"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="image" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        as="select"
        name="category"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      >
        <option value="">Select Category</option>
        <option v-for="category in shopStore.categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </Field>
      <ErrorMessage name="category" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        as="textarea"
        name="description"
        placeholder="Description"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="description" class="text-red-500 text-sm" />
    </div>
    <button
      class="py-2 px-4 block m-auto text-white bg-blue-500 w-fit rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition"
    >
      Add New Product
    </button>
  </VeeForm>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useShopStore } from '@/stores/shop'
import { useToast } from 'vue-toastification'

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      shopStore: useShopStore(),
      schema: yup.object({
        name: yup.string().required('Name is required'),
        price: yup.number().required('Price is required').positive('Price must be positive'),
        description: yup.string().required('Description is required'),
        category: yup.string().required('Category is required'),
        image: yup.string().url().required('Image is required'),
      }),
      toast: useToast(),
    }
  },
  methods: {
    /**
     * Adds a new product to the store.
     * @param {Object} values - The form values containing product details.
     */
    addProduct(values, { resetForm }) {
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
      // reset form values
      resetForm()
    },
  },
  mounted() {
    this.shopStore.fetchData()
  },
}
</script>
