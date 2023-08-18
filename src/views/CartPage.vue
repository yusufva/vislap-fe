<template>
    <div class="h-screen mx-auto text-center" v-if="loading">
        <v-progress-circular class="mt-16" :size="128" :width="12" color="blue-darken-3"
            indeterminate></v-progress-circular>
    </div>
    <div v-else>
        <v-container class="w-75 mx-auto">
            <v-card>
                <v-card-title class="text-blue-darken-3"><v-icon>mdi-cart</v-icon> Cart</v-card-title>
                <v-table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th></th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in cartItem" :key="list.index">
                            <td><v-img class="my-2" width="90" :src="url + 'images/' + list.barang.photo">
                                </v-img></td>
                            <td>{{ list.barang.nama }}</td>
                            <td>{{ formatCurrency(list.price) }}</td>
                            <td>{{ list.quantity }}</td>
                            <td>{{ formatCurrency(list.total_price) }}</td>
                            <td>
                                <v-btn icon="mdi-delete" color="red" variant="plain" size="small"
                                    @click="deleteCartItem(list.id)"></v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
            <v-card class="mt-4 ml-auto" width="400">
                <v-card-title class="text-blue-darken-3">Total</v-card-title>
                <v-table>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>{{ formatCurrency(totalItemPrice) }}</td>
                        </tr>
                        <tr>
                            <td>Kode Unik</td>
                            <td>{{ formatCurrency(uniqueCode) }}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{{ formatCurrency(grandTotal) }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
            <div class="text-center mt-4 ml-auto" style="width: 400px;">
                <v-btn class="text-body-1" color="blue-darken-3" @click="addToTxs()" :loading="loadingAdd">Proceed to
                    Payment</v-btn>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios';

import { useEnvStore } from '@/store/useEnvStore';
import { useAuthStore } from '@/store/useAuthStore';
export default {
    data() {
        return {
            cartItem: [],
            modifiedItem: [],
            loading: true,
            loadingAdd: false,
            totalItemPrice: 0,
            grandTotal: 0,
            uniqueCode: 0,
            url: useEnvStore().apiUrl
        }
    },
    methods: {
        async getCartData() {
            try {
                const accessToken = useAuthStore().accessToken
                const cart = await axios.get(useEnvStore().apiUrl + 'cart',
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
                this.cartItem = cart.data
                //melakukan map untuk mengambil field yang dibutuhkan
                const newData = this.cartItem.map(item => {
                    return {
                        product_name: item.barang.nama,
                        price: item.price,
                        quantity: item.quantity,
                        total_price: item.total_price
                    }
                })
                this.modifiedItem = newData
                this.loading = false
                console.log(this.modifiedItem)
                this.subtotals()
            }
            catch (err) {
                console.log(err)
                if (err.response.status === 403) {
                    this.$router.push('/login')
                }
            }
        },
        async deleteCartItem(itemId) {
            try {
                const accessToken = useAuthStore().accessToken
                this.loading = true
                const cart = await axios.delete(useEnvStore().apiUrl + 'cart/' + itemId,
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
                console.log(cart)
                this.getCartData()
            }
            catch (err) {
                if (err.response.status === 403) {
                    this.$router.push('/login')
                }
            }
        },
        async addToTxs() {
            try {
                const accessToken = useAuthStore().accessToken
                this.loadingAdd = true
                const txs = await axios.post(useEnvStore().apiUrl + 'txs/',
                    {
                        user_id: useAuthStore().user_id,
                        items: this.modifiedItem,
                        final_price: this.grandTotal,
                        unique_code: this.uniqueCode
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    })
                console.log(txs)
                this.loadingAdd = false
                this.getCartData()
                this.$router.push('/transaction/'+txs.data.id)
            }
            catch (err) {
                console.log(err)
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(value);
        },
        subtotals() {
            const total_bayar = this.cartItem.reduce((total, obj) => total + obj.total_price, 0)
            this.totalItemPrice = total_bayar
            this.uniqueCode = Math.floor(Math.random() * 1000)
            this.grandTotal = parseInt(this.totalItemPrice) + parseInt(this.uniqueCode)
            console.log(this.totalItemPrice, this.uniqueCode, this.grandTotal)
        }
    },
    mounted() {
        this.getCartData()
    },
}
</script>
<style lang="">
    
</style>