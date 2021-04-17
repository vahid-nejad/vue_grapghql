<template>
  <vue-page-transition name="zoom">
    <div class="m-1">
      <b-form class="m-2 form">
        <search-category
          v-on:selectedCategoryChanged="setSelectedCategory"
          :showNewCategoryButton="true"
          >انتخاب گروه کالا</search-category
        >
        <label for="productName">نام کالا:</label>
        <b-form-input name="productName" v-model="name"></b-form-input>
        <label for="description">اندازه:</label>
        <b-form-input name="description" v-model="size"></b-form-input>
        <label for="price">قیمت:</label>
        <b-form-input name="price" v-model="price"></b-form-input>

        <b-button @click="saveProduct" class="m-1" variant="success" block
          >ثبت</b-button
        >
      </b-form>
    </div>
  </vue-page-transition>
</template>

<script>
import SearchCategory from "./SearchCategory.vue";
import gql from "graphql-tag";
import { apolloClient } from "../main.js";
export default {
  components: { SearchCategory },
  name: "AddProdct",
  data() {
    return {
      categoryId: "",
      name: "",
      size: "",
      price: 0,
      selectedCategory: null,
      productImage: null,
    };
  },
  methods: {
    saveProduct() {
      this.saveProductFeatures();
    },
    setSelectedCategory: function (selectedCategory) {
      this.selectedCategory = selectedCategory;
    },
    // uploadProductImage() {
    //   let formData = new FormData();
    //   formData.append("file", this.productImage);
    //   axios
    //     .post("http://127.0.0.1:8000/admin/product/uploadImage", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then(function () {
    //       alert("SUCCESS!!");
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     });
    // },
    saveProductFeatures: function () {
      apolloClient
        .mutate({
          mutation: gql`
            mutation(
              $categoryID: ID!
              $unit: ID!
              $name: String!
              $size: String!
              $price: Int!
            ) # $imagePath: String
            {
              createProduct(
                input: {
                  category: {connect:$categoryID}
                  unit:{connect: $unit}
                  name: $name
                  size: $size
                  price: $price
                }
              )
              {
                id
              }
            }
          `,
          variables: {
            name: this.name,
            size: this.size,
            price: parseInt(this.price, 10),
            categoryID: this.selectedCategory.id,
            unit:1
          },
        })
        .then(() => {
          this.$bvToast.toast("اطلاعات ثبت شد.", {
            title: "",
            variant: "success",
            solid: true,
          });
          this.formRefresh();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formRefresh() {
      this.categoryID = "";
      this.size = "";
      this.name = "";
      this.price = 0;
      this.selectedCategory = null;
    },
  },
};
</script>

<style>
</style>