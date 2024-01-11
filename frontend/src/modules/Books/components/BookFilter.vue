<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-text-field label="Busqueda" prepend-icon="mdi-account" v-model="busqueda"
                :rules="[value => value.length < 50 || 'Cantidad maxima de caracteres']"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-autocomplete label="Genero" prepend-icon="mdi-subtitles" v-model="genero"
                :items="['Misterio/Thriller', 'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 'Romance', 'Libros para Niños', 'Desarrollo Personal', 'Novela Histórica', 'Poesía']"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
            <v-autocomplete label="Formato (opcional)" prepend-icon="mdi-account-file-text" v-model="formato"
                :items="['Digital', 'Fisico']"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
            <v-row align="center" justify-center>
                <v-col cols="4">
                    <v-icon left>mdi-star-check</v-icon>Rating
                </v-col>
                <v-col cols="8">
                    <v-rating
                        label="Rating"
                        prepend-icon="mdi-star"
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        size="36"
                        v-model="estrellas"
                    ></v-rating>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="4">
            <v-text-field label="Mayor a" prepend-icon="mdi-book-open-page-variant-outline" v-model="min"
                :rules="[     
                        value => !!value ? !isNaN(Number(value)) || 'El campo debe ser un numero válido.' : true,
                        value => (value <= max || max == null ) || 'Rango invalido.',
                        value => value >= 1 && value <= 4000  || 'Numero invalido.'
                    ]"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">  
            <v-text-field label="Menor a" prepend-icon="mdi-book-open-page-variant-outline" v-model="max"
                :rules="[     
                        value => !!value ? !isNaN(Number(value)) || 'El campo debe ser un numero válido.' : true,
                        value => (value >= min || min == null ) || 'Rango invalido.',
                        value => value >= 0 && value <= 4000 || 'Numero invalido.'
                    ]"
            ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-end"> 
            <v-btn small @click="limpiar" class="mr-4">
                Limpiar filtros
            </v-btn>
            <v-btn small @click="filtrar" color="primary">
                Aplicar filtros
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'BookFilter',
        props: {
        },
        data: () => ({
            busqueda:null,
            genero:null,
            estrellas:null,
            min:null,
            max:null,
            formato:null
        }),
        methods: {
            async limpiar(){
                this.busqueda=null
                this.genero=null
                this.estrellas=null
                this.min=null
                this.max=null
                this.formato=null
            },
            async filtrar(){
                const min = parseInt(this.min, 10);
                const max = parseInt(this.max, 10);
                this.$emit("apply-filters", {
                    busqueda: this.busqueda,
                    genero: this.genero,
                    estrellas: this.estrellas,
                    min: min,
                    max: max,
                    formato: this.formato
                })
            }
        },
    };
</script>