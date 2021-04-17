<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="800"
      img-height="239"
    >
      <b-carousel-slide
        caption=""
        :img-src="require('../assets/images/graphql.png')"
        :interval="50"
      ></b-carousel-slide>
      <b-carousel-slide
        caption=""
        :img-src="require('../assets/images/appolo.png')"
        :interval="50"
      ></b-carousel-slide>
      <b-carousel-slide
        caption=""
        :img-src="require('../assets/images/laravelAndArango.png')"
        :interval="50"
      ></b-carousel-slide>
     
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",

  computed: {
    iconUrl() {
      return require("../assets/images/img2.jpg");
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
  },
};
</script>