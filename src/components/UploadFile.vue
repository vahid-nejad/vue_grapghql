<template>
  <div>
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <b-button @click="saveProductFeatures">I am a Link</b-button>
  </div>
</template>



<script>
import gql from "graphql-tag";
import { apolloClient } from "../main.js";
export default {
  name: "UploadFile",
  data() {
    return {
      file1: null,
    };
  },
  methods: {
    saveProductFeatures: function () {
      apolloClient
        .mutate({
          mutation: gql`
            mutation(
              $file: Upload # $imagePath: String
            ) {
              uploadFile(file: $file)
            }
          `,
          variables: {
            file: this.file1,
          },
           context: {
              hasUpload: true
            }
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
  },
};
</script>