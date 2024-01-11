<template>
  <v-card class="pa-6">
      <v-card-title>Lista de Libros</v-card-title>
        <v-card class="pa-4">
          <v-card-title>Filtros</v-card-title>
          <book-filter @apply-filters="applyFilters"></book-filter>
        </v-card>   

      <v-data-table
        :search="search" 
        :headers="headers"
        :items="books"
        :items-per-page="limit"
        @update:itemsPerPage="updateItemsPerPage"
        :page="page"
        @update:page="updatePage"
        class="elevation-1"
        :server-items-length="totalServerDocs"
        :loading="loading"
      >
        
        <template v-slot:[`item.actions`]="{ item }">
        
          <book-update :book="item" :refreshBooks="booksFetch"></book-update>
          <book-delete :book="item" :refreshBooks="booksFetch"></book-delete>
          
        </template>
      
      </v-data-table>
  </v-card>
 
</template>

<script>
import booksProvider from '../providers/booksProviders';
import BookUpdate from './BookUpdate.vue'
import BookDelete from './BookDelete.vue';
import BookFilter from './BookFilter.vue';

export default {
  components: {
    BookUpdate,
    BookDelete,
    BookFilter
  },
  props: {
            refresh: {
                type: Boolean,
                required: true
            }
        },
  data: () => ({
    books:[],
    search:'',
    headers:[ {
            text: 'Author ',
            align: 'start',
            sortable: false,
            value: 'author',
          },
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'description' },
          { text: 'Year', value: 'year' },
          { text: 'Genre', value: 'genre' },
          { text: 'Rating', value: 'rating' },
          { text: 'Numero de paginas', value: 'numPages' },
          { text: 'Formato', value: 'format' },
          { text: 'Acciones', value: 'actions', sortable:'false', align:"center"}, // Nueva columna para acciones
    
         ],
         limit:10,
         totalServerDocs:0,
         loading:false
  }),

  methods: {
    async booksFetch(filters){
      try{
        this.loading = true
        const {data: {booksFetch}} = await booksProvider.booksFetch(null, null, this.page, this.limit, filters)
        this.books = booksFetch.docs
        this.totalServerDocs = booksFetch.totalDocs
        
      }catch{
        this.$emit('error', 'Ocurrió un error al obtener los libros.')
      }finally{
        this.loading= false
      }
    },
    updateItemsPerPage(limit){
      this.limit=limit
      this.booksFetch()
    },
    updatePage(page){
      this.page=page
      this.booksFetch()
    },
    applyFilters(filters){
      console.log("apply filter: ", filters)
      this.booksFetch(filters)
    }
  
  },
  watch: {
    refresh: function(newVal) {
      if (newVal == true) {
        this.booksFetch();
        this.$emit("books-refreshed")
      }
    }
  },
  mounted(){
    this.booksFetch()
    this.$emit("refreshBooks", this.booksFetch)
  }
}
  
</script>
