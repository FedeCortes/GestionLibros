<template>
    <v-card :to="link" class="text-center">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">{{title}}</v-list-item-title>
                <v-list-item-subtitle>{{subTitle}}</v-list-item-subtitle>
                <img :src="img"  style="width: 100%; height: 100%; background-color: white;">
                <v-btn :to="link">Ingresar</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-card>
</template>
<script>

export default {
   
    name: 'CardComponent',
    props: {
        title:String,
        subTitle:String,
        img:String,
        link:String
    },
   
}
</script>