<template lang="">
    <v-app>
        <v-app-bar color="white" position="fixed" height="80">
            <div class="d-flex flex-column w-100 align-center justify-center">
                <router-link class="text-decoration-none title-font text-blue-darken-3" style="font-size:30px" to="/">
                    Vislap
                </router-link>
                <div class="d-flex flex-row">
                    <router-link class="text-decoration-none text-blue-darken-3 mx-2 mb-2" v-for="link in links" :key="links.index" :to="link.route">{{link.title}}</router-link>
                </div>
            </div>
            <v-btn v-if="isLoggedIn" class="mr-8 text-body-1" color="primary" prepend-icon="mdi-account-circle" position="absolute" location="right">
                {{username}}
                <v-menu activator="parent">
                    <v-list class="text-center">
                        <div class="mx-4 my-2">
                        Hello, {{username}}!
                        </div>
                        <div class="d-flex flex-column">
                        <v-btn color="blue" prepend-icon="mdi-cart" variant="text" size="small" @click="this.$router.push('/cart')">Cart</v-btn>
                        <v-btn color="blue" prepend-icon="mdi-cash-multiple" variant="text" size="small" @click="this.$router.push('/transaction')">Trans</v-btn>
                        <v-btn color="red" prepend-icon="mdi-exit-to-app" variant="text" size="small" @click="onLogout()">Logout</v-btn>
                        </div>
                    </v-list>
                </v-menu>
            </v-btn>
            <router-link v-else to="/login">
                <v-btn class="mr-4" color="blue-darken-3" variant="tonal" position="absolute" location="right">Login</v-btn>
            </router-link>
        </v-app-bar>
        <v-main>
        <router-view></router-view>
        </v-main>
        <Footer></Footer>
    </v-app>
</template>
<script>
import { useAuthStore } from '@/store/useAuthStore';
import Footer from '@/components/Footer.vue'
export default {
    components: { Footer },
    data() {
        return {
            links: [
                { title: "Home", route: "/" },
                { title: "Spareparts", route: "/shop" },
                { title: "Service", route: "/service" },
                { title: "About Us", route: "/about" }
            ],
            isLoggedIn: null,
            username: null
        }
    },
    methods: {
        onLogout() {
            useAuthStore().logout()
            this.loginCheck()
        },
        loginCheck() {
            this.isLoggedIn = useAuthStore().loginStatus,
                this.username = useAuthStore().getUsername
        }
    },
    mounted() {
        this.loginCheck()
    },
}
</script>
<style lang="">
    
</style>