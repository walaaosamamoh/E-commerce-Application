<template>
    <component :is="layout">
      <router-view />
    </component>
</template>

<script>
import DefaultLayout from './DefaultLayout.vue'
import AdminLayout from './AdminLayout.vue'
import AuthLayout from './AuthLayout.vue'
    export default {
        name: 'AppLayout',
        computed:{
          layout(){
            const layout = this.$route.meta.layout;
            if(layout==='admin')return AdminLayout;
            if(layout==='auth')return AuthLayout;
            return DefaultLayout;
          }
        }
    }
</script>
