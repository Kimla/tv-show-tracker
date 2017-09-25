<template lang="pug">
    div.home
        heroSection
        div.popular-shows
            h2.popular-shows__heading Popular shows
            showList( v-if="popularShows" :shows="popularShows" )
</template>

<script>
import heroSection from '@/components/HeroSection';
import showList from '@/components/ShowList';

export default {
    name: 'home',
    components: {
        heroSection,
        showList
    },
    computed: {
        popularShows () {
            let shows = this.$store.getters.popularShows;

            if ( shows < 1 ) {
                return false;
            }

            return shows;
        }
    },
    created() {
        this.$store.dispatch('loadPopularShows');
    }
}
</script>

<style lang="scss">
    .popular-shows {
        &__heading {
            font-weight: 600;
            margin-bottom: 30px;
        }
    }
</style>
