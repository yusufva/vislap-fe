<template lang="">
    <div>
        <div class="ma-4">
            <v-img :src="serviceImg" max-height="300" cover></v-img>
            <div class="d-flex flex-row">
                <div class="w-50">
                    <div class="text-blue-darken-3 text-h3 font-weight-medium">
                        Service
                    </div>
                    <div>
                        Vislap menyediakan layanan service laptop dengan biaya yang terjangkau, teknisi yang berpengalaman, dan kecepatan waktu pengerjaan.
                        <br>Anda dapat mengajukan permintaan service dengan memasukkan nomor whatsapp dan keluhan anda pada form disamping.
                    </div>
                </div>
                <div class="w-50 ma-4">
                    <!-- ketika sudah login -->
                    <div v-if="isLoggedIn">
                        <v-card class="pa-4">
                            <v-card-title class="text-blue-darken-3">
                                Ajukan Permintaan Service
                            </v-card-title>
                            <v-text-field v-model="wa" type="number" variant="outlined" color="blue-darken-3" label="Masukkan Nomor Whatsapp" density="compact"></v-text-field>
                            <v-textarea v-model="message" variant="outlined" color="blue-darken-3" label="Tuliskan keluhan anda" clearable auto-grow></v-textarea>
                            <v-card-actions>
                                <v-btn class="mx-auto" color="blue-darken-3" variant="tonal" :loading="loading" @click="submitService(), loading=true">Ajukan</v-btn>
                            </v-card-actions>
                            <div class="text-center">
                                <p class="text-green">{{success}}</p>
                            </div>
                        </v-card>
                    </div>
                    <!-- ketika sudah belum login -->
                    <div v-else>
                        <v-card class="pa-4">
                            <v-card-title class="text-blue-darken-3">
                                Ajukan Permintaan Service
                            </v-card-title>
                            <v-card-text>Harap melakukan Login terlebih dahulu.</v-card-text>
                            <v-card-actions>
                                <v-btn class="mx-auto" color="blue-darken-3" variant="tonal" :loading="loading" @click="this.$router.push('/login')">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import serviceImg from '@/assets/servicePage.jpg'
import axios from 'axios';

import { useAuthStore } from '@/store/useAuthStore';
import { useEnvStore } from '@/store/useEnvStore';
export default {
    data() {
        return {
            isLoggedIn: useAuthStore().loginStatus,
            loading:false,
            serviceImg:serviceImg,
            wa:null,
            message:null,
            success:null
        }
    },
    methods: {
        async submitService(){
            try{
                const submit=await axios.post(useEnvStore().apiUrl+'services',{
                    wa_user:this.wa,
                    message1:this.message
                },
                {
                    headers:{
                        Authorization: 'Bearer '+useAuthStore().accessToken
                    }
                })
                this.loading=false
                this.success="Berhasil diajukan"
                this.message=null
                this.wa=null
            }
            catch(err){
                console.log(err)
                if(err.response.status===403){
                    this.$router.push('/login')
                }
            }
        }
    },
}
</script>
<style lang="">
    
</style>