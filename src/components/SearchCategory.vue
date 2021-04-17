<template>
  <div>
    <label for="parentName"><slot />:</label>
    <b-form-input
      name="parentName"
      v-model="selectedCategoryName"
      disabled
    ></b-form-input>
    <b-button block class="mt-1 mb-1" v-b-modal.modal-xl variant="warning"
      > <slot
    /></b-button>
    <b-modal
      :header-bg-variant="warning"
      :header-text-variant="light"
      :body-bg-variant="light"
      :body-text-variant="dark"
      id="modal-xl"
      size="xl"
      title="Extra Large Modal"
    >
      <template v-slot:modal-header :header-bg-variant="warning">
        <h3><slot /> را انتخاب کنید</h3>
      </template>
      <template v-slot:modal-footer>
        <b-button variant="danger" @click="$bvModal.hide('modal-xl')"
          >انصراف</b-button
        >
        <router-link v-if="showNewCategoryButton" to="/category"
          ><b-button class="m-1" variant="primary">
            تعریف گروه جدید</b-button
          ></router-link
        >
      </template>
      <b-spinner  v-if="$apollo.loading" label="Spinning"></b-spinner>
      <b-table
        id="table-transition-example"
        :tbody-transition-props="flip - list"
        :items="categories"
        :fields="fields"
        primary-key="name"
      >
        <template #cell(parent)="data">
          {{ getCategoryFullName(data.item.id) }}
        </template>
        <template #cell(name)="data">
          <a href="#" @click="setSelectedCategory(data.item.id)">{{
            data.value
          }}</a>
        </template>
      </b-table>
    </b-modal>
  </div>
</template>

<script>
import gql from "graphql-tag";
// import { apolloClient } from "../main.js";
export default {
  name: "SearchCategory",
  props: {
    showNewCategoryButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedCategoryName: "",
      selectedCategory: null,
      categories: [],
      fields: [
        {
          key: "name",
          label: "نام گروه",
          sortable: true,
          class: "text-center",
        },
        {
          key: "parent",
          label: "گروه مادر",
          class: "text-center",
        },
      ],
    };
  },
  apollo: {
    categories: gql`
      query {
        categories {
          id
          name
          parent_id
        }
      }
    `,
    fetchPolicy: "no-cache",
  },
  methods: {
    refreshCategories() {
     this.$apollo.queries.categories.refetch();
    },
    setSelectedCategory(categoryId) {
      this.selectedCategory = this.categories.find((obj) => {
        return obj.id === categoryId;
      });
      this.$bvModal.hide("modal-xl");
      this.selectedCategoryName = this.getCategoryFullName(
        this.selectedCategory.id
      );
      this.$emit("selectedCategoryChanged", this.selectedCategory);
    },
    getCategoryFullName: function (categoryId) {
      if (categoryId === undefined) {
        return "";
      }
      let category = this.categories.find((obj) => {
        return obj.id === categoryId;
      });
      let parent = this.categories.find((obj) => {
        return obj.id === category.parent_id;
      });
      if (parent === undefined) {
        return category.name;
      } else {
        return (
          this.getCategoryFullName(category.parent_id) + ">>" + category.name
        );
      }
      
    },
  },
  mounted(){
    console.log(this.categories)
  }
};
</script>

<style>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>