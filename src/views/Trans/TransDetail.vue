<template lang="">
    <div class="h-screen mx-auto text-center" v-if="loading">
        <v-progress-circular class="mt-16" :size="128" :width="12" color="blue-darken-3"
            indeterminate></v-progress-circular>
    </div>
  <div v-else>
    <!-- for status menunggu pembayaran -->
    <div v-if="txDetail.status_id===1">
        <v-container>
            <v-btn class="mb-2" color="blue-darken-3" prepend-icon="mdi-arrow-left" @click="this.$router.push('/transaction')" variant="plain">Back</v-btn>
            <v-card>
                <v-card-title class="text-blue-darken-3">Transaction Details</v-card-title>
            <div class="d-flex flex-row mb-4">
                <v-card class="w-50 mx-2 px-4 pb-4">
                    <v-card-text class="font-weight-bold">
                        Status: {{getStatus(txDetail.status_id)}}
                    </v-card-text>
                    <v-card class="ma-4" v-for="items in txDetail.items" :key="items.id">
                        <v-card-text class="font-weight-bold">{{items.product_name}}</v-card-text>
                        <v-row class="ml-2">
                            <v-col>
                                Quantity
                            </v-col>
                            <v-col>
                                Price
                            </v-col>
                            <v-col>
                                Total
                            </v-col>
                        </v-row>
                        <v-row class="mt-n4 ml-2">
                            <v-col>
                                {{items.quantity}}
                            </v-col>
                            <v-col>
                                {{formatCurrency(items.price)}}
                            </v-col>
                            <v-col>
                                {{formatCurrency(items.total_price)}}
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title class="font-weight-bold">
                                Final Price: {{formatCurrency(txDetail.final_price)}}
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-table>
                                    <tbody>
                                        <tr>
                                            <td>Total Price: </td>
                                            <td>{{formatCurrency(txDetail.final_price-txDetail.unique_code)}}</td>
                                        </tr>
                                        <tr>
                                            <td>Unique Code: </td>
                                            <td>{{formatCurrency(txDetail.unique_code)}}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
                <v-card class="w-50 mx-2 px-4">
                    <v-card-title>
                        Cara Pembayaran
                    </v-card-title>
                    <v-expansion-panels>
                        <v-expansion-panel v-for="panel in panels" :key="panel.id">
                            <v-expansion-panel-title>
                                <v-img class="mr-4" :src="panel.img" max-width="40" height="40"></v-img>
                                {{panel.title}}
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                {{panel.text}}
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </div>
                <v-card-title class="text-center">Status Transaksi</v-card-title>
                    <v-card-text>
                        <v-timeline class="mb-4" direction="horizontal">
                            <v-timeline-item v-for="list in transStatus" :key="list.index" :dot-color="getStatusColor(list.id)" size="small" >
                                {{list.status}}
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
            </v-card>
        </v-container>
    </div>
    <!-- for status other menunggu pembayaran -->
    <div v-else>
        <v-container>
            <v-btn class="mb-2" color="blue-darken-3" prepend-icon="mdi-arrow-left" @click="this.$router.push('/transaction')" variant="plain">Back</v-btn>
            <v-card>
                <v-card-title class="text-blue-darken-3">Transaction Details</v-card-title>
                <v-card class="mx-2 px-4 pb-4">
                    <v-card-text class="font-weight-bold">
                        Status: {{getStatus(txDetail.status_id)}}
                    </v-card-text>
                    <v-card class="ma-4" v-for="items in txDetail.items" :key="items.id">
                        <v-card-text class="font-weight-bold">{{items.product_name}}</v-card-text>
                        <v-row class="ml-2">
                            <v-col>
                                Quantity
                            </v-col>
                            <v-col>
                                Price
                            </v-col>
                            <v-col>
                                Total
                            </v-col>
                        </v-row>
                        <v-row class="mt-n4 ml-2">
                            <v-col>
                                {{items.quantity}}
                            </v-col>
                            <v-col>
                                {{formatCurrency(items.price)}}
                            </v-col>
                            <v-col>
                                {{formatCurrency(items.total_price)}}
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title class="font-weight-bold">
                                Final Price: {{formatCurrency(txDetail.final_price)}}
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-table>
                                    <tbody>
                                        <tr>
                                            <td>Total Price: </td>
                                            <td>{{formatCurrency(txDetail.final_price-txDetail.unique_code)}}</td>
                                        </tr>
                                        <tr>
                                            <td>Unique Code: </td>
                                            <td>{{formatCurrency(txDetail.unique_code)}}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
                <v-card-title class="text-center">Status Transaksi</v-card-title>
                    <v-card-text>
                        <v-timeline class="mb-4" direction="horizontal">
                            <v-timeline-item v-for="list in transStatus" :key="list.index" :dot-color="getStatusColor(list.id)" size="small" >
                                {{list.status}}
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
            </v-card>
        </v-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

import { useAuthStore } from '@/store/useAuthStore';
import { useEnvStore } from '@/store/useEnvStore';
export default {
    data() {
        return {
            loading: true,
            txDetail: [],
            transStatus: [
                { id: 1, status: 'Menunggu Pembayaran' },
                { id: 2, status: 'Pembayaran Diterima' },
                { id: 3, status: 'Barang Dikirim' },
                { id: 4, status: 'Transaksi Selesai' },
            ],
            panels: [
                { img: 'https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_fon.png', title: 'Bank Mandiri', text: 'Lakukan transfer ke nomor rekening Mandiri 03120327842104' },
                { img: 'https://i0.wp.com/febi.uinsaid.ac.id/wp-content/uploads/2020/11/Logo-BRI-Bank-Rakyat-Indonesia-PNG-Terbaru.png?ssl=1', title: 'Bank BRI', text: 'Lakukan transfer ke nomor rekening BRI 74827341809' },
                { img: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png', title: 'Bank BNI', text: 'Lakukan transfer ke nomor rekening BNI 237874279' }
            ]
        }
    },
    methods: {
        async getTxDetail() {
            try {
                const txDetail = await axios.get(useEnvStore().apiUrl + 'txs/' + this.$route.params.id, {
                    headers: {
                        Authorization: 'Bearer ' + useAuthStore().accessToken
                    }
                })
                console.log(txDetail)
                this.txDetail = txDetail.data
                this.loading = false
            }
            catch (err) {
                console.log(err)
            }
        },
        getStatus(status) {
            console.log(status)
            switch (status) {
                case status = 1:
                    return "Menunggu Pembayaran"
                case status = 2:
                    return "Pesanan Diproses"
                case status = 3:
                    return "Menunggu Pengiriman"
                case status = 4:
                    return "Selesai"
                case status = 5:
                    return "Dibatalkan"
            }
        },
        getStatusColor(listId) {
            if (listId === this.txDetail.status_id) {
                return "green"
            }
            else {
                return "grey"
            }
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
        this.getTxDetail()
    },
}
</script>
<style lang="">
    
</style>
