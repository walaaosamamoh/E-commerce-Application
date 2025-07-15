<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
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
}
</script>
