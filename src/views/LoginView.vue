<template>
  <div>
    <VeeForm @submit="handleLogin" :validation-schema="schema">
          <h2 class="text-2xl font-bold mb-4">{{$t('login.title')}}</h2>
          <div>
            <Field name="email" type="email" :placeholder="$t('login.email')" class="form-input border border-gray-400 outline-none w-full p-2 mb-2 rounded"/>
            <ErrorMessage name="email" class="text-red-500 text-sm"/>
          </div>
          <div>
            <Field name="password" type="password"  
            :placeholder="$t('login.password')" 
            class="form-input border border-gray-400 outline-none w-full p-2 mb-2 rounded"/>
            <ErrorMessage name="password" class="text-red-500 text-sm" />
          </div>
          <button type="submit" class="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">{{$t('login.button')}}</button>
    </VeeForm>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import {useAuthStore} from '@/stores/auth';
import {mapState, mapActions} from 'pinia';
import {useToast} from 'vue-toastification';

  export default {
    name: 'AdminLayout',
    components: {
      VeeForm,
      Field,
      ErrorMessage
    },

    computed:{
      ...mapState(useAuthStore, [
        'users',
        'error',
        'getUserByEmail'
      ])
    },
    data(){
      return{
        schema: yup.object({
          email: yup.string().email('Invalid email').required('Email is required'),
          password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        user: null
      }
    },
    created(){
      this.toast= useToast()
    },
    methods:{
      ...mapActions(useAuthStore, [
        'fetchUsers'
      ]),

      handleLogin(values, {resetForm}){
        // Validate form values
        this.user = this.getUserByEmail(values.email)
        // Check if user exists
        if(!this.user){
          // Show error message if user not found
          this.toast.error('User not found',{
            timeout: 2000,
          })
          // Reset form values
          resetForm()
          return
        }
        // show success message if user found
        this.toast.success('Login successful',{
            timeout: 1000,
        })

        // save user to localStorage
        localStorage.setItem('user', JSON.stringify(this.user))

        setTimeout(() => {
          // Redirect user based on role
          this.checkUserRole()
        }, 1000)
      },

      // Check user role and redirect accordingly
      checkUserRole(){
        if(this.user && this.user.roleID === 'admin'){
          this.$router.push({name:'dashboard'})
        }else{
          this.$router.push({name:'home'})
        }
      }
    },

    mounted(){
      this.fetchUsers()
    }
  }
</script>
