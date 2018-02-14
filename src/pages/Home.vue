<template lang="pug">
    div.home
        HeroSection
        div.container
            div.popular-shows
                h2.popular-shows__heading Popular shows
                showList( v-if="popularShows" :shows="popularShows" )
</template>

<script>
import HeroSection from '@/components/HeroSection';
import showList from '@/components/ShowList';

export default {
    name: 'home',
    components: {
        HeroSection,
        showList
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
.popular-shows {
    &__heading {
        font-weight: 600;
        margin-bottom: 40px;
    }
}
</style>
