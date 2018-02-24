<template lang="pug">
    div.formPage
        div.formPage__inner
            h1 Create an account
            div.form
                div.formInputs
                    div.input-holder
                        input.input( type="email" id="email" name="email" v-model="email" placeholder="Email..." )
                    div.input-holder
                        input.input( type="password" id="password" name="password" v-model="password" placeholder="Password..." )
                    div.input-holder
                        input.input( type="password" id="password-confirm" name="password-confirm" v-model="password2" placeholder="Confirm password..." )
                div.formBottom
                    div.button-holder
                        button.button.button--large( type="button" @click="register()" ) Register
                            img.button__arrow( src="../assets/arrow.svg" )

        div.linkHolder
            router-link.formLink( to="/login" ) Already have an account?
</template>

<script>
import {api} from '@/helpers/helpers';
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

            api.post('/register', {
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
