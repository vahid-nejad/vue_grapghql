<template>
  <vue-page-transition name="zoom">
    <div class="m-1">
      <!-- <search-category
        ref="searchCategory"
        v-on:selectedCategoryChanged="filterProductsByCategory"
        :showNewCategoryButton="false"
        >فیلتر بر اساس گروه کالا</search-category
      > -->

      <b-card-group columns>
        <!-- <vue-page-transition name="zoom"> -->
        <Product
          v-on:productDeleted="refreshProductQuery($event)"
          v-for="item in products"
          v-bind:key="item.id"
          :product="item"
        />
        <!-- </vue-page-transition> -->
      </b-card-group>
      <b-spinner
        v-if="$apollo.loading"
        variant="primary"
        label="Text Centered"
      ></b-spinner>
    </div>
  </vue-page-transition>
</template>

<script>
import Product from "./Product.vue";
import gql from "graphql-tag";



export default {
  components: { Product },
  name: "Products",
  data() {
    return {
     
    };
  },
  apollo: {
    products: gql`
      query {
        products {
          id
          name
          size
          price
          category
          {
            id
          }
        }
      }
    `,

    fetchPolicy: "no-cache",
  },
  methods: {
    refreshProductQuery() {
      this.$apollo.queries.products.refetch();
    },
    filterProductsByCategory(selectedCat) {
      this.selectedCategory = selectedCat;
    },
  },
  // computed: {
  //   filterdProducts() {
  //     if (
  //       this.selectedCategory === undefined ||
  //       this.selectedCategory === null
  //     ) {
  //       return this.Products;
  //     } else if (this.selectedCategory._id === MAIN_CATEGORY) {
  //       return this.Products;
  //     } else {
  //       return this.Products.filter(
  //         (product) => product.category_id === this.selectedCategory._id
  //       );
  //     }
  //   },
  // },

  mounted: function () {
    this.refreshProductQuery();
  },
};
</script>

<style>
</style>