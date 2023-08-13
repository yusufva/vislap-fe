import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        username: null,
        user_id: null,
        isLoggedIn: false
    }),
    actions: {
        getToken(token) {
            this.accessToken = token
        },
        login(response) {
            this.isLoggedIn = true,
            this.user_id=response.userId
                this.username = response.name
        },
        logout() {
            this.isLoggedIn = false,
            this.user_id=null,
                this.username = null,
                this.accessToken = null
        }
    },
    getters: {
        loginStatus() {
            return this.isLoggedIn
        },
        getUsername() {
            return this.username
        }
    },
    persist: true
})
