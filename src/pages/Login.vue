<template lang="pug">
    div.login.form
        h1 Login

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" v-model="email" )

        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" v-model="password" )

        div.form__bottom
            div.register-link-holder
                router-link.register-link( to="/register" ) Don't have an account?

            div.button-holder
                buttonEl( :button="{ label: 'Login' }" @Clicked="login()" )
</template>

<script>
import axios from 'axios';
import buttonEl from '@/components/Button.vue';

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

            axios.post('http://localhost:8000/login', {
                email,
                password
            })
            .then(function (response) {
                if ( response.status === 200 ) {
                    localStorage.setItem("token", response.data.token);
                    _this.$store.commit('login');
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
    created() {
        if ( this.$store.getters.isLoggedIn ) {
            this.$router.replace("/");
        }
    }
}
</script>

<style lang="scss">
    .login {
        &__bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    .register-link {
        font-size: 15px;
    }
</style>
