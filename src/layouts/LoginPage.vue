<template lang="">
        <v-row class="ma-0">
            <v-col class="h-screen pa-0">
                <v-img :src="sideImage" cover>
                    <div class="h-screen d-flex flex-column justify-center align-center text-white">
                        <div class="title-font" style="font-size:60px;">Vislap</div>
                        <div class="text-body-1">Your Notebook Solution</div>
                    </div>
            </v-img>
            </v-col>
            <v-col class="d-flex flex-column align-center justify-center">
                <v-card class="w-50 px-6" variant="outlined" color="blue-darken-4">
                    <v-card-title>Welcome!</v-card-title>
                    <v-card-text>Silahkan login dengan akun anda</v-card-text>
                    <v-text-field v-model="email" label="Email" variant="outlined" prepend-inner-icon="mdi-account-circle" density="compact" clearable></v-text-field>
                    <v-text-field v-model="password" label="Password" variant="outlined" prepend-inner-icon="mdi-lock" density="compact"></v-text-field>
                    <v-card-action>
                        <v-btn class="mb-4 text-body-2" variant="flat" color="blue-darken-4" density="comfortable" block @click="onLogin">Login</v-btn>
                    </v-card-action>
                </v-card>
                <div class="text-body-2 mt-2">
                    Belum punya akun? <router-link class="text-decoration-none text-blue-darken-3" to="/register">Daftar disini</router-link>
                </div>
            </v-col>
        </v-row>
</template>
<script>
import sideImage from '@/assets/login_img.png'

import { useEnvStore } from '@/store/useEnvStore'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
    data() {
        return {
            sideImage: sideImage,
            email: null,
            password: null,
            token:null
        }
    },
    methods: {
        async onLogin() {
            try {
                const login = await axios.post(useEnvStore().apiUrl+"users/login", {
                    email: this.email,
                    password: this.password
                })
                console.log(login)
                console.log(login.headers['set-cookie'])
                this.decodejwt(login.data.access_token)
                this.aquireToken()
            }
            catch (err) {
                console.log(err)
            }
        },
        aquireToken() {
            axios.get(useEnvStore().apiUrl + "token")
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        decodejwt(acctoken) {
            const token = acctoken
            const secret = import.meta.env.VITE_ACCESS_TOKEN_SECRET
            try {
                const decoded = jwt_decode(token, secret)
                console.log(decoded)
            }
            catch (err) {
                console.log(err)
            }
        }
    },
}
</script>
