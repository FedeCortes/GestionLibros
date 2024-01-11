<template>

    <v-btn @click="startEditing" color="blue" icon>          
                    <v-icon>mdi-book-edit</v-icon>
    

    <v-dialog v-model="isEditing" width="500" persistent>
        <v-card width="500">
            <v-toolbar color="blue">
                <v-row class="justify-center align-center">
                    <v-col cols="10" class="white--text">
                        <v-card-title>
                            Edicion de libro
                        </v-card-title>
                    </v-col>
                    <v-col cols="2" class="text-end">
                        <v-btn icon @click="isEditing = false" class="white--text">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-toolbar>
            <v-card-text>
                <!-- author, title, description, year, genre, rating, numPages, format -->
                <v-form v-model="formValidate" class="mt-4">
                    <v-text-field label="Autor (requerido)" prepend-icon="mdi-account" v-model="form.author"
                        :rules="[value => !!value || 'Este campo es obligatorio.',
                            value => value.length < 50 || 'Cantidad maxima de caracteres' ]"
                    ></v-text-field>
                    <v-text-field label="Titulo (requerido)" prepend-icon="mdi-format-title" v-model="form.title"
                        :rules="[value => !!value || 'Este campo es obligatorio.',
                    value => value.length < 50 || 'Cantidad maxima de caracteres' ]"
                    ></v-text-field>
                    <v-text-field label="Descipción (opcional)" prepend-icon="mdi-image-text" v-model="form.description"
                    :rules="[
                    value => (value => value.length < 100 || value == null) || 'Cantidad maxima de caracteres' ]"
                    >
                    </v-text-field>
                    <v-text-field label="Año (opcional)" prepend-icon="mdi-calendar-blank-outline" v-model.number="form.year"
                        :rules="[
                            value => !!value ? !isNaN(Number(value) || value == null) || 'El campo debe ser un numero válido.' : true,
                            value => (value <= 2023 && value >=1 || value==null)|| 'Rango valido del 1 al 2023.' 
                        ]"
                    ></v-text-field>
                    <v-autocomplete label="Genero (opcional)" prepend-icon="mdi-subtitles" v-model="form.genre"
                    :items="['Misterio/Thriller', 'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 'Romance', 'Libros para Niños', 'Desarrollo Personal', 'Novela Histórica', 'Poesía']"
                    ></v-autocomplete>
                    <v-text-field label="Rating (opcional)" prepend-icon="mdi-star" v-model.number="form.rating"
                    :rules="[     
                            value => !!value ? !isNaN(Number(value) || value == null) || 'El campo debe ser un numero válido.' : true , 
                            value => (value <= 5 && value >=1 || value== null)|| 'Rango valido del 1 al 5.' 
                        ]"
                    ></v-text-field>
                    <v-text-field label="Número de paginas (opcional)" prepend-icon="mdi-book-open-page-variant-outline" v-model.number="form.numPages"
                    :rules="[     
                            value => !!value ? !isNaN(Number(value) || value == null) || 'El campo debe ser un numero válido.' : true,
                            value => (value <= 4000 && value >=1 || value == null)|| 'Rango valido del 1 al 4000.' 
                        ]"
                    ></v-text-field>
                    <v-autocomplete label="Formato (opcional)" prepend-icon="mdi-account-file-text" v-model="form.format"
                        :items="['Digital', 'Fisico']"
                    ></v-autocomplete>
                </v-form>
                <v-btn block color="blue" class="mt-4 white--text" :disabled="!formValidate" @click="editar" :loading="loading">
                   Editar libro<v-icon right>mdi-send</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-btn>
</template>
  
<script>
import booksProvider from '../providers/booksProviders';
export default {
 
 data: ()=>({
    form: {
        id:null,
        author:null,
        title:null,
        description:null,
        year:null,
        genre:null,
        rating:null,
        numPages:null,
        format:null
        },
    loading:false,
    isEditing:false,
    formValidate: true
 }),
 props: {
   book: Object,
   refreshBooks: Function
   },
 methods: {
    startEditing(){
        this.isEditing=true
        this.form = { ...this.book };
    },
   async editar() {
    this.loading = true
     console.log("El libro es " + this.book.title + " id "+this.book.id);
           
     try{
        this.form.id = this.book.id;
        await new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, 2000)
        })
       await booksProvider.bookFindByIdAndUpdate(this.form)
       this.refreshBooks()
     }catch(error){
        console.log(error)
     }finally{
        this.loading=false
        this.isEditing=false
     }
     
   }
 }
};
</script>