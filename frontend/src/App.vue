<template>
  <div id="app" class="container is-max-desktop">
    <router-link
      :to="{ path: '/items', name: 'ItemList' }"
      class="button is-medium"
      >Items</router-link
    >
    <router-link
      :to="{ path: '/customers', name: 'CustomerList' }"
      class="button is-medium"
      >Customers</router-link
    >
    <router-link
      :to="{ path: '/sales', name: 'SalesList' }"
      class="button is-medium"
      >Sales</router-link
    >
    <router-view />
  </div>
</template>
  
<script>
export default {
  name: "App",
};
</script>
  
<style>
/* import style bulma */
@import "~bulma/css/bulma.css";
</style>