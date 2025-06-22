<template>
  <div class="home">
    <h1 class="text-3xl font-bold text-center mt-10">Welcome to the Home Page</h1>
    <p class="text-center mt-4">This is the home page of our application.</p>
    <div class="mt-8 max-w-3xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category.id" class="mb-2">
         <div class="flex items-center">
           <span class="font-bold">{{ category.name }}</span>
         </div>
          <ul class="ml-6 mt-2">
            <li v-for="product in getProductsByCategory(category.id)" :key="product.id" class="mb-4 p-4 border rounded">
              <img :src="product.image" :alt="product.name" class="w-32 h-32 object-cover mb-2" />
              <div class="font-semibold">{{ product.name }}</div>
              <div class="text-gray-600">${{ product.price }}</div>
              <div class="mt-2">
                <strong>Comments:</strong>
                <ul class="ml-4 list-disc">
                  <li v-for="comment in getCommentsByProduct(product.id)" :key="comment.id">{{ comment.text }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-2xl font-semibold mt-10">Products</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <li v-for="product in products" :key="product.id" class="p-4 border rounded shadow">
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-2" />
          <div class="font-semibold">{{ product.name }}</div>
          <div class="text-gray-600">${{ product.price }}</div>
          <div class="mt-2">
            <strong>Comments:</strong>
            <ul class="ml-4 list-disc">
              <li v-for="comment in getCommentsByProduct(product.id)" :key="comment.id">{{ comment.text }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'; // Adjust the import path as necessary
// @ is an alias to /src
export default {
  name: 'HomeView',
  data() {
    return {
      categories: [],
      products: [],
      comments: [],
    };
  },
  methods: {
    getProductsByCategory(categoryId) {
      return this.products.filter(p => p.categoryId === categoryId);
    },
    getCommentsByProduct(productId) {
      return this.comments.filter(c => c.productId === productId);
    },
    async fetchData() {
      const [catRes, prodRes] = await Promise.all([
        http.get('categories'),
        http.get('products')
      ]);
      console.log('prodRes.data:', prodRes.data);
      const categories = catRes.data.categories || [];
      const products = prodRes.data && prodRes.data.products ? prodRes.data.products : [];
      if (!Array.isArray(products)) {
        console.warn('Expected products to be an array, got:', products);
        this.categories = categories;
        this.products = [];
        this.comments = [];
        return;
      }
      // Fetch comments for all products
      let allComments = [];
      for (const product of products) {
        const res = await http.get(`products/${product.id}/comments`);
        const comments = res.data.comments.map(c => ({ ...c, productId: product.id }));
        allComments = allComments.concat(comments);
      }
      this.categories = categories;
      this.products = products;
      this.comments = allComments;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
