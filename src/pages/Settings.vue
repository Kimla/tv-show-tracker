<template lang="pug">
    div.settings
        h1 Settings
        buttonEl( :button="{ label: 'Logout' }" @Clicked="logout()" )
</template>

<script>
import buttonEl from '@/components/Button.vue';

export default {
    name: 'settings',
    components: {
        buttonEl,
    },
    methods: {
        logout() {
            this.$store.commit('logout');
        }
    }
}
</script>

<style lang="scss">

</style>
