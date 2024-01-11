<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-btn to="/" plain>
      App de gestion de libros
    </v-btn>
    </v-app-bar>

    <v-main class="mb-16 pb-10">
      <router-view></router-view>
    </v-main>
    <v-footer padless fixed>
      <v-card flat tile color="primary" min-width="100%" class="pa-4" dark>
        <v-card-title>
          Proyecto de libros
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
