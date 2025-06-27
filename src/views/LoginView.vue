<template>
  <div>
    <VeeForm @submit.prevent="handleLogin" :validation-schema="schema">
          <h2 class="text-2xl font-bold mb-4">Welcome back! Please log in</h2>
          <div>
            <Field name="email" type="email" placeholder="Email" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded"/>
            <ErrorMessage name="email" class="text-red-500 text-sm" />
          </div>
          <div>
            <Field name="password" type="password" placeholder="Password" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded"/>
            <ErrorMessage name="password" class="text-red-500 text-sm" />
          </div>
          <button type="submit" class="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
    </VeeForm>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

  export default {
    name: 'AdminLayout',
    components: {
      VeeForm,
      Field,
      ErrorMessage
    },
    data(){
      return{
        schema: yup.object({
          email: yup.string().email('Invalid email').required('Email is required'),
          password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        })
      }
    },
    methods:{
      handleLogin(){}
    }
  }
</script>