<template>
    <v-dialog v-model="dialog" width="500" persistent>
        <v-card width="500">
            <v-toolbar color="blue">
                <v-row class="justify-center align-center">
                    <v-col cols="10" class="white--text">
                        <v-card-title>
                            Creación de libro
                        </v-card-title>
                    </v-col>
                    <v-col cols="2" class="text-end">
                        <v-btn icon @click="dialog = false" class="white--text">
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
                    :rules="[ (value => value.length < 100 || value == null)|| 'Cantidad maxima de caracteres' ]"
                    ></v-text-field>
                    <v-text-field label="Año (opcional)" prepend-icon="mdi-calendar-blank-outline" v-model.number="form.year"
                        :rules="[
                            value => !!value ? !isNaN(Number(value)) || 'El campo debe ser un numero válido.' : true,
                            value => (value <= 2023 && value >=1 || value == null)|| 'Rango valido del 1 al 2023.' 
                        ]"
                    ></v-text-field>
                    <v-autocomplete label="Genero (opcional)" prepend-icon="mdi-subtitles" v-model="form.genre"
                    :items="['Misterio/Thriller', 'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 'Romance', 'Libros para Niños', 'Desarrollo Personal', 'Novela Histórica', 'Poesía']"
                    ></v-autocomplete>
                    <v-text-field label="Rating (opcional)" prepend-icon="mdi-star" v-model.number="form.rating"
                    :rules="[     
                            value => !!value ? !isNaN(Number(value)) || 'El campo debe ser un numero válido.' : true , 
                            (value => value <= 5 && value >=1 || value == null)|| 'Rango valido del 1 al 5.' 
                        ]"
                    ></v-text-field>
                    <v-text-field label="Número de paginas (opcional)" prepend-icon="mdi-book-open-page-variant-outline" v-model.number="form.numPages"
                    :rules="[     
                            value => !!value ? !isNaN(Number(value)) || 'El campo debe ser un numero válido.' : true,
                           (value => value <= 4000 && value >=1 || value == null)|| 'Rango valido del 1 al 4000.' 
                        ]"
                    ></v-text-field>
                    <v-autocomplete label="Formato (opcional)" prepend-icon="mdi-account-file-text" v-model="form.format"
                        :items="['Digital', 'Fisico']"
                    ></v-autocomplete>
                </v-form>
                <v-btn block color="blue" class="mt-4 white--text" :disabled="!formValidate" @click="bookCreate" :loading="loading">
                   <slot name="button"></slot>
                   <v-icon right>mdi-send</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
  
<script>
    import booksProvider from '../providers/booksProviders';

    export default {
        name: 'BookCreate',
        props: {
            value: {
                type: Boolean,
                required: true
            }
        },
        data: () => ({
            form: {
                author: null,
                title: null,
                description: null,
                year: null,
                genre: null,
                rating: null,
                numPages: null,
                format: null
            },
            formValidate: true,
            loading: false
        }),
        computed: {
            dialog: {
                get(){
                    return this.value
                },
                set(value){
                    this.$emit('input', value)
                }
            }
        },
        methods: {
            async bookCreate(){
                try{
                    this.loading = true
                    console.log(this.form)
                    await booksProvider.bookCreateOne(this.form)
                  //this.$refs.bookList.bookFetch();
                    this.$emit('success', 'El libro se ha creado correctamente.')
                    this.$emit('books-updated'); //evento para indicar que se actualizaron los libros
                }catch(error){
                    this.$emit('error', 'Ocurrió un error al crear un libro.')
                    console.log(error)
                }finally{
                    this.loading = false
                    this.dialog = false
                }

              
                this.form.author= null,
                this.form.title= null,
                this.form.description= null,
                this.form.year= null,
                this.form.genre= null,
                this.form.rating= null,
                this.form.numPages= null,
                this.form.format= null
            
            }
        },
    };
</script>