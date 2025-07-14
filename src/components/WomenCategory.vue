<template>
  <div>
    <h2 class="text-2xl text-center font-semibold my-10">{{$t('categories.title.women')}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WomenCategory',
}
</script>