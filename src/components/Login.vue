<template lang="pug">
    div.login.form
        h1 Login

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" v-model="email" )

        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" v-model="password" )

        div.login__bottom
            div.register-link-holder
                router-link.register-link( to="/register" ) Don't have an account?

            div.button-holder
                buttonEl( :button="{ label: 'Login' }" @Clicked="login()" )
</template>

<script>
import buttonEl from './Button.vue'

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
            if ( this.email.length < 1 || this.password.length < 1 ) {
                // TODO: Add error message
                return false;
            }
            console.log("login");
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
