<template lang="pug">
    div#app
        Navigation

        div.pageWrapper
            router-view

        Notice
</template>

<script>
import Navigation from './components/Navigation';
import Notice from './components/Notice';

export default {
    name: 'app',
    components: {
        Navigation,
        Notice
    },
    created() {
        const token = localStorage.getItem("token");
        if (token) {
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
