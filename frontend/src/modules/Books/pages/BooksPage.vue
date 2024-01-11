<template>
    <v-row>
        <v-snackbar v-model="alert.value" top color="rgba(0,0,0,0)" elevation="0" class="pa-0 ma-0">
            <v-alert :type="alert.type" v-model="alert.value" dismissible>
                {{ alert.message }}
            </v-alert>
        </v-snackbar>
        <v-btn large fab color="blue" @click="createBookModal = true" class="floating-button">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <book-create v-model="createBookModal" @success="createSuccessAlert" @error="createSuccessError" @books-updated="toggleRefreshBooks">
        <template v-slot:button>Crear libro</template>
        </book-create>
        
        <v-col cols="12" md="12">
            <book-list @success="createSuccessAlert" @error="createSuccessError" :refresh="this.refresh" @books-refreshed="toggleRefreshBooks"></book-list>
        </v-col>
    </v-row>
</template>
  
<script>
    import BookCreate from '../components/BookCreate.vue'
    import BookList from '../components/BookList.vue'

    //import booksProvider from "@/providers/booksProviders"

    export default {
        name: 'BooksPage',
        components: {
            BookCreate,
            BookList
        },
        data() {
            return {
                createBookModal: false,
                alert: {
                    value: false,
                    message: '',
                    type: 'info'
                },
                refresh:false
            }
        },
        methods: {
            toggleRefreshBooks(){
                this.refresh=!this.refresh
                
            },
            createSuccessAlert(message){
                this.alert = {
                    value: true,
                    message: message,
                    type: 'success'
                }
            },
            createSuccessError(message){
                this.alert = {
                    value: true,
                    message: message,
                    type: 'error'
                }
            }
        },
    };
</script>

<style scoped>
.floating-button{
    z-index:100;
    position:fixed;
    right:20px;
    bottom:20px;
}
</style>
  