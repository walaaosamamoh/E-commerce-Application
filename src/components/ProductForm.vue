<template>
  <VeeForm
    @submit="$emit('submit',$event )"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="flex flex-col gap-2 max-w-sm mx-auto px-5 pb-5"
  >
    <div >
      <Field
        type="text"
        name="name"
        :placeholder="$t('admin.name')"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="name" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        type="number"
        name="price"
        :placeholder="$t('admin.price')"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="price" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        type="url"
        name="image"
        :placeholder="$t('admin.url-img')"
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
        <option value="">{{$t('admin.select-category')}}</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ $t(`categories.${category.name}`) }}
        </option>
      </Field>
      <ErrorMessage name="category" class="text-red-500 text-sm" />
    </div>
    <div>
      <Field
        as="textarea"
        name="description"
        :placeholder="$t('admin.description')"
        class="border border-gray-400 outline-none w-full p-2 mb-2 rounded shadow"
      />
      <ErrorMessage name="description" class="text-red-500 text-sm" />
    </div>
    <button
      class="py-2 px-4 block m-auto text-white bg-blue-500 w-fit rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition"
    >
      {{ submitText }}
    </button>
  </VeeForm>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage,
  },
  props: {
    initialValues: {
      type: Object,
      default: () => ({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
      }),
    },
    categories:{
      type: Array,
      required: true
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
  },
  
  data() {
    return {
      schema: yup.object({
        name: yup.string().required('Name is required'),
        price: yup.number().required('Price is required').positive('Price must be positive'),
        description: yup.string().required('Description is required'),
        category: yup.string().required('Category is required'),
        image: yup.string().url().required('Image is required'),
      }),
    }
  },
  emits: ['submit'],   
}
</script>
