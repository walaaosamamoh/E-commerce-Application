<template>
  <div>
    <AppLayout />
  </div>
</template>

<script>
import AppLayout from './components/layouts/AppLayout.vue'
  
export default {
  name: 'App',
  components: {
    AppLayout,
  },
  mounted(){
    document.dir = this.$i18n.locale === 'ar' ? 'rtl' : 'ltr';
  }
}
</script>
