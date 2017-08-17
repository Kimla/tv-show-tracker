<template lang="pug">
    div.register.form
        h1 Register

        div.input-holder
            label.label( for="name" ) Name
            input.input( type="text" id="name" name="name" )

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" )

        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" )

        div.input-holder
            label.label( for="password-confirm" ) Confirm Password
            input.input( type="password" id="password-confirm" name="password-confirm" )

        div.register__bottom
            div.login-link-holder
                router-link.login-link( to="/login" ) Already have an account?

            div.button-holder
                buttonEl( :button="{ label: 'Register' }" @Clicked="register()" )
</template>

<script>
import buttonEl from '@/components/Button.vue'

export default {
    name: 'register',
    components: {
        buttonEl,
    },
    data() {
        return {

        }
    },
    methods: {
        register() {
            console.log("register");
        }
    }
}
</script>

<style lang="scss">
    .register {
        &__bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .login-link {
        font-size: 15px;
    }
</style>
