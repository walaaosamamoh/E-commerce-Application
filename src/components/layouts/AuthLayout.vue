<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full bg-white shadow-md rounded-lg p-6 max-w-md">
          <router-view :key="$route.fullPath" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AuthLayout',
    }
</script>