<template>
    <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <img src="@/assets/logo_sondeos.png" alt="Logo">
        </v-col>
      </v-row>
  
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" lg="4">
          <card-component title="Libros" subTitle="Gestión de libros" img="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f4da.png" link="books"></card-component>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <card-component title="Usuarios" subTitle="Gestión de usuarios" img="https://cdn-icons-png.flaticon.com/512/10542/10542356.png" link=""></card-component>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import CardComponent from '../components/CardComponent.vue';
  export default {
    name: "home-page",
    components: {
      CardComponent,
  },
  };
  </script>

<style lang="scss" scoped>

</style>