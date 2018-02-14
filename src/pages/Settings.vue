<template lang="pug">
    div.settings
        h1 Settings
        buttonEl( :button="{ label: 'Logout' }" @Clicked="logout()" )
</template>

<script>
import buttonEl from '@/components/Button';

export default {
    name: 'settings',
    components: {
        buttonEl,
    },
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
</style>
