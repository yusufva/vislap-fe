<template lang="">
    <div class="h-screen mx-auto text-center" v-if="loading">
        <v-progress-circular class="mt-16" :size="128" :width="12" color="blue-darken-3"
            indeterminate></v-progress-circular>
    </div>
    <div v-else>
        <v-container>
            <v-card class="pa-4">
                <v-card-title class=text-blue-darken-3>Your Transaction</v-card-title>
                <v-card v-for="tx in txData" :key="tx.id" class="mb-2" @click="toTxDetail(tx.id)">
                    <v-card-title>{{tx.status.status}}</v-card-title>
                    <div class="d-flex flex-row">
                    <v-card-text>{{formattedDate(tx.date)}}</v-card-text>
                    <v-card-text class="text-right">{{formatCurrency(tx.final_price)}}</v-card-text>
                    </div>
                </v-card>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import { useAuthStore } from '@/store/useAuthStore';
import { useEnvStore } from '@/store/useEnvStore';

import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
export default {
    data() {
        return {
            loading:true,
            txData: []
        }
    },
    methods: {
        async getTxs() {
            try {
                const accessToken = useAuthStore().accessToken
                const txs = await axios.get(useEnvStore().apiUrl + 'txs',
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
                console.log(txs)
                this.txData = txs.data
                this.loading=false
            }
            catch (err) {
                console.log(err)
            }
        },
        toTxDetail(id){
            this.$router.push('/transaction/'+id)
        },
        formattedDate(value) {
            moment.locale('id')
            return moment(value).format('D MMMM YYYY [Jam] HH:mm:s')
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(value);
        },
    },
    mounted() {
        this.getTxs()
    },
}
</script>
<style lang="">
    
</style>