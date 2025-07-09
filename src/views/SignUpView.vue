<template>
  <div>
    <VeeForm @submit="handleSignUp" :validation-schema="schema">
          <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
          <div>
            <Field name="email" type="email" placeholder="Email" class="border border-gray-400 outline-none w-full p-2 mb-2 rounded"/>
            <ErrorMessage name="email" class="text-red-500 text-sm"/>
          </div>
          <div>
            <Field name="password" type="password" placeholder="Password" 
            class="border border-gray-400 outline-none w-full p-2 mb-2 rounded"/>
            <ErrorMessage name="password" class="text-red-500 text-sm" />
          </div>
          <button type="submit" class="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign Up                                                                           </button>
    </VeeForm>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import {useToast} from 'vue-toastification'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../firebase'; 
import {doc, setDoc} from 'firebase/firestore';

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
        }),
        user: null,
        role: null
      }
    },
    created(){
      this.toast= useToast()
    },
    methods:{
      handleSignUp(values, {resetForm}){
        // Create new user in Firebase
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            // Determine user role based on email
            this.role = values.email === 'admin@example.com' ? 'admin' : 'user'; 
            // Add user to Firestore
            await setDoc(doc(db, 'users', user.uid), {
              email: values.email,
              roleID: this.role 
            });
            this.toast.success('User created successfully')
            resetForm()
            this.redirectPath()
          })
          .catch((error) => {
            this.toast.error(error.message)
          });
      },

    
      redirectPath(){
        if(this.role === 'admin'){
          this.$router.push({name: 'dashboard'})
        } else {
          this.$router.push({name: 'home'})
        }
      }
    },
  }
</script>