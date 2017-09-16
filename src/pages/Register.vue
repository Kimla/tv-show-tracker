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
            email: '',
            password: '',
            password2: '',
        }
    },
    methods: {
        register() {
            const email = this.email;
            const password = this.password;
            
            this.$store.dispatch('register', {email, password});
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
