<template>
  <h2 class="text-2xl text-center font-semibold my-10">{{ $t('categories.title.kids') }}</h2>
  <slot></slot>
</template>

<script>
  export default {
    name: 'KidsCategory',
  }
</script>