<template lang="">
    <v-app>
        <v-app-bar color="white" position="fixed" height="80">
            <div class="d-flex flex-column w-100 align-center justify-center">
                <div class="title-font text-blue-darken-3" style="font-size:30px">
                    Vislap
                </div>
                <div class="d-flex flex-row">
                    <router-link class="text-decoration-none text-blue-darken-3 mx-2 mb-2" v-for="link in links" :key="links.index" :to="link.route">{{link.title}}</router-link>
                </div>
            </div>
            <router-link to="/login">
                <v-btn class="mr-4" color="blue-darken-3" variant="tonal" position="absolute" location="right">Login</v-btn>
            </router-link>
        </v-app-bar>
        <v-main>
        <router-view></router-view>
        </v-main>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            links: [
                { title: "Home", route: "/" },
                { title: "Spareparts", route: "/shop" },
                { title: "Service", route: "/service" },
                { title: "About Us", route: "/about" }
            ]
        }
    },
}
</script>
<style lang="">
    
</style>