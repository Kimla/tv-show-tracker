<template lang="pug">
    div.Settings
        div.container
            h1 Settings
            div.button( @click="logout()" )
                div.button__inner Logout
</template>

<script>
export default {
    name: 'Settings',
    methods: {
        logout() {
            this.$store.commit('logout');
            let notice = {
                message: 'You are now logged out!',
                status: 'is-success',
            };

            this.$store.dispatch('showNotice', notice);
        }
    },
    beforeCreate() {
        if ( !this.$store.getters.isLoggedIn ) {
            this.$router.replace("/login");
        }
    }
}
</script>

<style lang="scss">
.Settings {
    padding-top: 30px;
    width: 100%;
    text-align: center;
}
</style>
