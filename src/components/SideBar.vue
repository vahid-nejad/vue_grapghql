<template>
  <div>
    <b-button v-b-toggle.sidebar-variant> <slot></slot></b-button>
    <b-sidebar
      id="sidebar-variant"
      title="شروع"
      bg-variant="light"
      text-variant="dark"
      right
      shadow
    >
      <div class="px-3 py-2">
        <router-link to="/welcome"
          ><b-button class="m-1" block pill variant="primary">
            صفحه اصلی</b-button
          ></router-link
        >

        <router-link to="/addProduct"
          ><b-button class="m-1" block pill variant="primary">
            افزودن محصول جدید</b-button
          ></router-link
        >
        <router-link to="/products"
          ><b-button class="m-1" block pill variant="primary">
            محصولات</b-button
          ></router-link
        >
        <router-link to="/category"
          ><b-button class="m-1" block pill variant="primary">
            دسته محصولات</b-button
          ></router-link
        >
        <router-link to="/upload"
          ><b-button class="m-1" block pill variant="primary">
          آپلود</b-button
          ></router-link
        >
      </div>
    </b-sidebar>
  </div>
</template>


<script>
export default {
  name: "SideBar",
};
</script>