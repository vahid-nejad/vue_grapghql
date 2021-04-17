<template>
  <vue-page-transition name="zoom">
  <div>
   
    <b-form class="form m-3">
       <b-spinner
      v-if="isMutating"
      variant="primary"
      label="Text Centered"
    ></b-spinner>
      <search-category ref="searchCategoryComponent" v-on:selectedCategoryChanged="setSelectedParentCategory">
        انتخاب گروه مادر</search-category
      >
      <label>نام گروه:</label>
      <b-form-input v-model="newCateName"></b-form-input>
      <b-button @click="saveNewCategory" class="m-1" variant="success" block
        >ثبت</b-button
      >
      <router-link to="/welcome"
        ><b-button class="m-1" block variant="danger">
          صفحه اصلی</b-button
        ></router-link
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
  name: "Category",
  data() {
    return {
      newCateName: "",
      selectedParentCategory: null,
      isMutating: false,
    };
  },
  methods: {
    setSelectedParentCategory: function (selectedCategory) {
      this.selectedParentCategory = selectedCategory;
    },
    saveNewCategory: function () {
      this.isMutating = true;
      // alert(this.isMutating)
     let token= localStorage.getItem("apollo-token")
     console.log(token)
      apolloClient
        .mutate({
          mutation: gql`
            mutation($name: String!, $parent_id: ID!) {
              createCategory(name: $name, parent_id: $parent_id) {
                id
                name
                parent_id
              }
            }
          `,
          variables: {
            name: this.newCateName,
            parent_id: this.selectedParentCategory.id,
            token
          },
        })
        .then(() => {
          this.$bvToast.toast("اطلاعات ثبت شد.", {
            title: "",
            variant: "success",
            solid: true,
          });

          this.$refs.searchCategoryComponent.refreshCategories();
        })
        .catch((err) => {
          console.log(err);
        });
      this.isMutating = false;
    },
  },
};
</script>

<style>
</style>