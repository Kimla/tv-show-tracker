<template lang="pug">
    div.formPage
        div.formPage__inner
            h1 Welcome back
            div.form
                div.formInputs
                    div.input-holder
                        input.input( type="email" id="email" name="email" v-model="email" placeholder="Email..." )
                    div.input-holder
                        input.input( type="password" id="password" name="password" v-model="password" placeholder="Password..." )
                div.formBottom
                    div.button-holder
                        button.button.button--large( type="button" @click="login()" ) Sign in
                            span.button__arrow ▶

        div.linkHolder
            router-link.formLink( to="/register" ) Don't have an account?
</template>

<script>
import axios from 'axios';
import buttonEl from '@/components/Button';

export default {
    name: 'login',
    components: {
        buttonEl,
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login() {
            const email = this.email;
            const password = this.password;
            const _this = this;

            axios.post(apiUrl+'/login', {
                email,
                password
            })
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    _this.$store.commit('login');
                    _this.$store.commit('setMyShows', { myShows: response.data.shows });
                    _this.showSuccessNotice();
                } else {
                    this.showErrorNotice();
                }
            })
            .catch(function (error) {
                console.log(error.response);
                _this.showErrorNotice();
            });
        },
        showSuccessNotice() {
            let notice = {
                message: 'You are now logged in!',
                status: 'is-success',
            };

            this.$store.dispatch('showNotice', notice);
        },
        showErrorNotice() {
            let notice = {
                message: 'You have entered an invalid username or password!',
                status: 'is-error',
            };

            this.$store.dispatch('showNotice', notice);
        }
    },
    beforeCreate() {
        if ( this.$store.getters.isLoggedIn ) {
            this.$router.replace("/");
        }
    }
}
</script>

<style lang="scss">
</style>
