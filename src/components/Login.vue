<template lang="pug">
    div.login.form
        h1 Login

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" )

        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" )

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

        }
    },
    methods: {
        login() {
            console.log("login");
        }
    }
}
</script>

<style lang="scss">
    .login {

    }
</style>
