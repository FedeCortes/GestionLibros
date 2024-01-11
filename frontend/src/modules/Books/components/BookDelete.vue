<template>
  <v-btn @click="borrar" color="red" icon>
    <v-icon>mdi-delete</v-icon>

    <v-dialog v-model="borrando" width="500" persistent>
      <v-card width="500">
        <v-toolbar color="blue">
          <v-row class="justify-center align-center">
            <v-col cols="10" class="white--text">
              <v-card-title>¿Seguro que deseas borrar el libro?</v-card-title>
            </v-col>
            <v-col cols="2" class="text-end">
              <v-btn icon @click="cerrarDialogo" class="white--text">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>

        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">Título: {{ book.title }}</v-col>
              <v-col cols="12">Autor: {{ book.author }}</v-col>
              <v-col cols="12" v-if="book.description">Descripción: {{ book.description }}</v-col>
              <v-col cols="12" v-if="book.year">Year: {{ book.year }}</v-col>
              <v-col cols="12" v-if="book.genre">Genero: {{ book.genre }}</v-col>
              <v-col cols="12" v-if="book.numPages">Numero de paginas: {{ book.numPages }}</v-col>
              <v-col cols="12" v-if="book.format">Formato: {{ book.format }}</v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn block color="blue" class="mt-4 white--text" @click="borrarOk">
              Borrar libro<v-icon right>mdi-send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import booksProvider from '../providers/booksProviders';

export default {
  data: () => ({
    borrando: false,
  }),

  props: {
    book: Object,
    refreshBooks: Function,
  },

  methods: {
    borrar() {
      this.borrando = true;
    },

    cerrarDialogo() {
      this.borrando = false;
    },

    async borrarOk() {
      try {
        console.log(`Borrando el libro: ${this.book.title} (ID: ${this.book.id})`);
        await booksProvider.deleteBookById(this.book.id);
        this.refreshBooks();
        this.borrando = false;
      } catch (error) {
        console.error('Error al intentar borrar el libro:', error.message || error);
      }
    },
  },
};
</script>
