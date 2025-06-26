import { defineStore } from 'pinia';
import http from '@/utils/http';

export const useShopStore = defineStore('shop', {
  state: () => ({
    categories: [],
    products: [],
    comments: [],
    loading: false,
    error: null,
    currentProduct: null,
  }),
  getters: {
    getProductsByCategory: (state) => (categoryId) => {
      if (!categoryId) return state.products;
      return state.products.filter(p => p.categoryId === categoryId);
    },
    getCommentsByProduct: (state) => (productId) => {
      return state.comments.filter(c => c.productId === productId);
    },
    getProductById: (state) => {
      return state.currentProduct;
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
        // Fetch all products for each category and add categoryId
        let allProducts= [];
        for (const category of categories){
          const res = await http.get(`categories/${category.id}/products`);
          const products = res.data.products.map(p => ({ ...p, categoryId: category.id }));
          allProducts = allProducts.concat(products);
        }
        let allComments = [];
        for (const product of products) {
          const res = await http.get(`products/${product.id}/comments`);
          const comments = res.data.comments.map(c => ({ ...c, productId: product.id }));
          allComments = allComments.concat(comments);
        }
        this.categories = categories;
        this.products = allProducts;
        this.comments = allComments;
      } catch (e) {
        this.error = e.message || 'Failed to fetch data';
      } finally {
        this.loading = false;
      }
    },
    async fetchProduct(productId){
      this.loading=true
      this.error=null;
      try{
        const res = await http.get(`products/${productId}`) 
        const product = res.data.product
        this.currentProduct = product
      }catch (e) {
        this.error = e.message || 'Failed to fetch data';
      } finally {
        this.loading = false;
      }
    },
    async createComment(newComment){
      this.error=null
      try{
        const res = await http.post('/comments', newComment)
        const commentWithId = {...res.data.comment, productId: newComment.productId}
        this.comments.push(commentWithId)
        console.log(this.comments)
        return res.data;
      }catch(e){
        this.error = e.message || 'Failed to add comment';
      }
    }
  },
});
