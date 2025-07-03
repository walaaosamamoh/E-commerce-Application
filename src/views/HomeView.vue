<template>
  <div>
    <button
      v-if="!loading"
      @click="(activeComponent = 'AllProducts'), (categoryId = null)"
      class="px-4 py-2 ml-5 text-blue-500 font-bold border-b-2 border-transparent hover:border-b-blue-500 transition"
      :class="{ 'border-b-blue-500': categoryId === null }"
    >
      All
    </button>
    <!-- category tabs -->
    <button
      v-for="category in categories"
      :key="category.id"
      @click="(activeComponent = category.name + 'Category'), (categoryId = category.id)"
      class="px-4 py-2 text-blue-500 font-bold border-b-2 border-transparent hover:border-b-blue-500 transition"
      :class="{ 'border-b-blue-500': categoryId === category.id }"
    >
      {{ category.name }}
    </button>
  </div>
  <div>
    <!-- dynamic component rendering -->
    <keep-alive v-if="!loading">
      <component :is="activeComponent">
        <div>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
            <li
              v-for="product in filteredProducts"
              :key="product.id"
              class="p-4 bg-white rounded shadow hover:shadow-lg transition"
              @click="goToProduct(product.id)"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-48 object-cover mb-4"
              />
              <div class="font-semibold">{{ product.name }}</div>
              <div class="text-blue-600">${{ product.price }}</div>
              <div class="mt-2">
                <strong>Comments:</strong>
                <ul class="ml-4 list-disc text-gray-600 text-sm">
                  <li
                    v-for="comment in getCommentsByProduct(product.id).slice(0,5)"
                    :key="comment.id"
                  >
                    {{ comment.text }}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </component>
    </keep-alive>
    <!-- loading -->
    <div v-else class="flex items-center justify-center min-h-screen bg-white">
      <div
        class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  </div>
</template>

<script>
import { useShopStore } from "@/stores/shop";
import { mapState, mapActions } from "pinia";
import MenCategory from "@/components/MenCategory.vue";
import WomenCategory from "@/components/WomenCategory.vue";
import KidsCategory from "@/components/KidsCategory.vue";
import AllProducts from "@/components/AllProducts.vue";

export default {
  name: "HomeView",
  components: { MenCategory, WomenCategory, KidsCategory, AllProducts },
  data() {
    return {
      categoryId: null, // To store the selected category ID
      activeComponent: "AllProducts", // Default component
    };
  },
  computed: {
    ...mapState(useShopStore, [
      "categories",
      "products",
      "loading",
      "getProductsByCategory",
      "getCommentsByProduct",
    ]),

    // get category products
    filteredProducts() {
      return this.getProductsByCategory(this.categoryId);
    },
  },
  methods: {
    ...mapActions(useShopStore, ["fetchData"]),

    goToProduct(productId) {
      this.$router.push({ name: "product", params: { id: productId } });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
