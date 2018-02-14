<template lang="pug">
    div#app
        navigation

        div.pageWrapper
            router-view

        notice
</template>

<script>
import navigation from './components/Navigation';
import notice from './components/Notice';

export default {
    name: 'app',
    components: {
        navigation,
        notice
    },
    created() {
        const token = localStorage.getItem("token");
        if ( token ) {
            this.$store.dispatch('loadMyShows');
        }
    }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss">
@import './styles/main.scss';
.pageWrapper {
    min-height: 100vh;
    padding-top: 54px;
    display: flex;
}
</style>
