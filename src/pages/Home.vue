<template lang="pug">
    div.home
        HeroSection
        div.container
            h2 Popular shows
            ShowList( v-if="popularShows" :shows="popularShows" )
</template>

<script>
import HeroSection from '@/components/HeroSection';
import ShowList from '@/components/ShowList';

export default {
    name: 'home',
    components: {
        HeroSection,
        ShowList
    },
    computed: {
        popularShows () {
            return this.$store.getters.popularShows;
        }
    },
    created() {
        this.$store.dispatch('loadPopularShows');
    }
}
</script>

<style lang="scss">
.home {
    width: 100%;
}
</style>
