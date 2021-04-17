<template>
    <div>
         <b-form-input id="range-1" v-model="value" type="range" min="0" max="5"></b-form-input>
         <div class="mt-2">Value: {{ value }}</div>
         <b-button @click="add"></b-button>
    </div>
</template>

<script>
export default {
  name: "AddCategory",
   props: {
   
  },
   data() {
      return {
        value: '2',
      }
    },
    methods:{
        add:function(){
           alert(this.value)
        }
    }
};
</script>

<style>
</style>