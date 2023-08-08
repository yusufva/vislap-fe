<template lang="">
    <div class="h-screen d-flex flex-row">
        <v-container class="w-25 pl-8">
            <v-card class="h-screen" border>
                <v-card-title class="text-body-2 font-weight-bold mt-16 mb-8">Category:</v-card-title>
                <v-checkbox v-for="item in category" class="ml-3 mt-n8" :key="item.index" v-model="catCheck" :label="item.name" :value="item.name" 
                color="blue-darken-3" density="compact"></v-checkbox>
            {{catCheck}}
            </v-card>
        </v-container>
        <v-container class="w-75">
            <div class="text-center text-h5">Spare Parts</div>
            <div class="d-flex flex-row mt-8">
                <v-card class="w-25 mx-4" v-for="items in products" :key="items.index">
                    <v-card-text>
                        <v-img class="mx-auto" cover :width="180" :src="url+'images/'+items.photo"></v-img>
                    </v-card-text>
                    <v-card-text class="mx-4 mt-n4 text-body-1">{{items.nama}}</v-card-text>
                    <v-card-text class="text-right mx-4 mt-n8 text-body-1">{{items.harga}}</v-card-text>
                    <div class="text-right mr-4 mb-2">
                        <v-btn color="green" icon="mdi-cart-check" variant="text"></v-btn>
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios';

import { useEnvStore } from '@/store/useEnvStore';
export default {
    data() {
        return {
            category: [],
            catCheck: [],
            products: [],
            url: useEnvStore().apiUrl
        }
    },
    methods: {
        async getCategory() {
            try {
                const cat = await axios.get(useEnvStore().apiUrl + 'category')
                // console.log(cat)
                this.category = cat.data
            }
            catch (err) {
                console.log(err)
            }
        },
        async getItems() {
            try {
                const prod = await axios.get(useEnvStore().apiUrl + 'products')
                console.log(prod)
                this.products = prod.data
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.getCategory(),
            this.getItems()
    },
}
</script>