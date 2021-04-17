<template>
  <div id="app">
    <side-bar>شروع</side-bar>
    <vue-page-transition name="zoom">
      <router-view></router-view>
    </vue-page-transition>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
  },
 
  mounted() {
    this.$router.push("/welcome");
    
  },
};
</script>

<style>
@import "./assets/styles/style.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
</style>
