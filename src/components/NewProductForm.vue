<template>
  <VeeForm :validation-schema="schema" 
  class="flex flex-col gap-2 max-w-sm mx-auto px-5 pb-5">
    <div>
      <Field type="text" name="name" placeholder="Name" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"/>
      <ErrorMessage name="name" class="text-red-500 text-sm"/>
    </div>
     <div>
      <Field type="number" name="price" placeholder="Price" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"/>
      <ErrorMessage name="price" class="text-red-500 text-sm"/>
    </div>
     <div>
      <Field type="url" name="image" placeholder="Image" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"/>
      <ErrorMessage name="image" class="text-red-500 text-sm"/>
    </div>
    <div>
      <Field as="select" name="category" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow">
        <option value="">Select Category</option>
        <option v-for="category in shopStore.categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </Field>
      <ErrorMessage name="category" class="text-red-500 text-sm"/>
    </div>
    <div>
      <Field as="textarea" name="description" placeholder="Description" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"/>
      <ErrorMessage name="description" class="text-red-500 text-sm"/>
    </div>
    <button class="py-2 px-4 block m-auto text-white bg-blue-500 w-fit rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition">Add New Product</button>
  </VeeForm>
</template>

<script>
import {Form as VeeForm,Field,ErrorMessage} from 'vee-validate'
import * as yup from 'yup';
import {useShopStore} from '@/stores/shop'

export default{
    components: {
      VeeForm,
      Field,
      ErrorMessage
    },
    data(){
      return{
        shopStore: useShopStore(),
        schema: yup.object({
          name: yup.string().required('Name is required'),
          price: yup.number().required('Price is required').positive('Price must be positive'),
          description: yup.string().required('Description is required'),
          category: yup.string().required('Category is required'),
          image: yup.string().url().required('Image is required')
        })
      }
    },
    mounted(){
      this.shopStore.fetchData();
    }
}
</script>