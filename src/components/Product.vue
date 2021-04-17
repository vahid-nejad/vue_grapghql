<template>
  <b-card
    img-src="http://127.0.0.1:8000/product.jpg"
    img-alt="Image"
    img-top
    header=" "
    header-tag="header"
    footer=""
    footer-tag="footer"
    title=""
    class="box  "
    style="max-width: 25rem"
  >
   <b-spinner
        v-if="isMutating"
        variant="primary"
        label="Text Centered"
      ></b-spinner>
    <b-card-text v-if="!isEditting.name" @click="editProductName">{{
      product.name
    }}</b-card-text>
    <b-form-input
    class="text-center"
      v-if="isEditting.name"
      v-model="product.name"
      v-focus
      @blur="endEdit"
      @keyup.enter="endEdit"
    ></b-form-input>
    <b-card-text>اندازه: {{ product.size }} سانت</b-card-text>
    <b-card-text>{{ product.price.toLocaleString() }} تومن</b-card-text>
    <b-button
    block
      @click="deleteProudct(product._id)"
      variant="danger"
      >حذف این محصول</b-button
    >
    <b-button
      block
      @click="updateProduct(product)"
      variant="warning"
      >بروزرسانی این محصول</b-button
    >
  </b-card>
</template>

<script>
import gql from "graphql-tag";
import { apolloClient } from "../main.js";
export default {
  name: "Product",
  data() {
    return {
      isEditting: {
        name: false,
        size: false,
        price: false,
      },
      isMutating:false,
    };
  },
  props: ["product"],
  computed: {
    isProductEditing: function () {
      return (
        this.isEditting.name || this.isEditting.size || this.isEditting.price
      );
    },
  },
  methods: {
    editProductName() {
      this.isEditting.name = true;
    },
    endEdit() {
      this.isEditting.name = this.isEditting.size = this.isEditting.price = false;
     
    },

    deleteProudct(product_id) {
      this.isMutating=true;

      apolloClient
        .mutate({
          mutation: gql`
            mutation($productID: ID!) {
              deleteProduct(productID: $productID)
            }
          `,
          variables: {
            productID: product_id,
          },
        })
        .then(() => {
          this.$bvToast.toast("محصول مورد نظر حذف شد", {
            title: "",
            variant: "danger",
            solid: true,
          });
      this.isMutating=false;

          this.$emit("productDeleted", "deleted");
        })
        .catch((err) => {
          alert(err);
        });
    },
    updateProduct(product) {
      this.isMutating=true;
      apolloClient
        .mutate({
          mutation: gql`
            mutation(
              $productID: ID!
              $name: String!
              $size: String!
              $price: Int!
            ) {
              editProduct(
                productID: $productID
                name: $name
                size: $size
                price: $price
              )
            }
          `,
          variables: {
            productID: product._id,
            name: product.name,
            size: product.size,
            price: product.price,
          },
        })
        .then(() => {
          this.$bvToast.toast("محصول مورد نظر بروزرسانی شد", {
            title: "",
            variant: "success",
            solid: true,
          });
           this.isMutating=false;
          // this.$emit("productDeleted", "deleted");
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style>
.box {
  transition: box-shadow 0.6s;
}
.box:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
</style>