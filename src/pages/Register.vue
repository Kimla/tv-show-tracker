<template lang="pug">
    div.register.form
        h1 Register

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" v-model="email" )
        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" v-model="password" )

        div.input-holder
            label.label( for="password-confirm" ) Confirm Password
            input.input( type="password" id="password-confirm" name="password-confirm" v-model="password2" )

        div.form__bottom
            div.login-link-holder
                router-link.form-link( to="/login" ) Already have an account?

            div.button-holder
                buttonEl( :button="{ label: 'Register' }" @Clicked="register()" )
</template>

<script>
import axios from 'axios';
import buttonEl from '@/components/Button'

export default {
    name: 'register',
    components: {
        buttonEl,
    },
    data() {
        return {
            email: '',
            password: '',
            password2: '',
        }
    },
    methods: {
        register() {
            const email = this.email;
            const password = this.password;
            const password2 = this.password2;
            const _this = this;

            if ( password !== password2 ) {
                let notice = {
                    message: 'Password does not match the confirm password',
                    status: 'is-error',
                };

                this.$store.dispatch('showNotice', notice);
                return false;
            }

            axios.post('http://localhost:8000/register', {
                email,
                password
            })
            .then(function (response) {
                if ( response.status === 200 && response.data.success ) {
                    localStorage.setItem("token", response.data.token);
                    _this.$store.commit('login');
                    _this.showSuccessNotice();
                }
            })
            .catch(function (error) {
                _this.handleError(error.response.data);
            });
        },
        showSuccessNotice() {
            let notice = {
                message: 'You are now logged in!',
                status: 'is-success',
            };

            this.$store.dispatch('showNotice', notice);
        },
        handleError(error) {
            let errorMessage = '';

            if ( error.email ) {
                errorMessage = error.email[0]
            } else if ( error.password ) {
                errorMessage = error.password[0]
            }

            let notice = {
                message: errorMessage,
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
