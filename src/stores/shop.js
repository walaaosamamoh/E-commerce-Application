import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    categories: [],
    products: [],
    comments: [],
    loading: false,
    error: null,
  }),
  getters: {
    getProductsByCategory: (state) => (categoryId) => {
      return state.products.filter(p => p.categoryId === categoryId);
    },
    getCommentsByProduct: (state) => (productId) => {
      return state.comments.filter(c => c.productId === productId);
    },
  },
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const [catRes, prodRes] = await Promise.all([
          http.get('categories'),
          http.get('products')
        ]);
        const categories = catRes.data.categories || [];
        const products = prodRes.data && prodRes.data.products ? prodRes.data.products : [];
        if (!Array.isArray(products)) {
          this.categories = categories;
          this.products = [];
          this.comments = [];
          this.error = 'Products is not an array';
          this.loading = false;
          return;
        }
        let allComments = [];
        for (const product of products) {
          const res = await http.get(`products/${product.id}/comments`);
          const comments = res.data.comments.map(c => ({ ...c, productId: product.id }));
          allComments = allComments.concat(comments);
        }
        this.categories = categories;
        this.products = products;
        this.comments = allComments;
      } catch (e) {
        this.error = e.message || 'Failed to fetch data';
      } finally {
        this.loading = false;
      }
    },
  },
});
