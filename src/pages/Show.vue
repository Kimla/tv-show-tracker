<template lang="pug">
    div.show( v-if="show" )
        div.showFixedTop.fixedHeader
            div.showFixedTop__back( @click="goBack()" )
                <svg height="32" width="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28 14H8.8l4.62-4.62c.394-.394.58-.864.58-1.38 0-.984-.813-2-2-2-.531 0-.994.193-1.38.58l-7.958 7.958C2.334 14.866 2 15.271 2 16s.279 1.08.646 1.447l7.974 7.973c.386.387.849.58 1.38.58 1.188 0 2-1.016 2-2 0-.516-.186-.986-.58-1.38L8.8 18H28a2 2 0 0 0 0-4z"/></svg>
            h1.showFixedTop__title {{ show.name }}
            span.save-button( v-if="!isSaved" @click="saveShow()" )
                img.navigation__icon( :src="starIcon")

            span.delete-button( v-if="isSaved" @click="deleteShow()" )
                img.navigation__icon( :src="starFilledIcon")

        div.container
            div.show__top
                div.show__image-holder( v-if="image" )
                    img.show__image( :src="image" )
                div.show__summary( v-html="show.summary" )
            ShowSeasons( :seasons="seasons" :active="activeSeason" @changed="activeSeasonChanged" )
            ShowEpisode( v-for="episode in episodes" :episode="episode" :key="episode.id" )
            p.noEpisodesFound( v-if="episodes.length < 1" ) No episodes found in this season
</template>

<script>
import axios from 'axios';
import ShowSeasons from '@/components/ShowSeasons';
import ShowEpisode from '@/components/ShowEpisode';
import starFilledIcon from '@/assets/star_filled.svg'
import starIcon from '@/assets/star_border.svg'

export default {
    name: 'show',
    components: {
        ShowSeasons,
        ShowEpisode,
    },
    data() {
        return {
            id: this.$route.params.id,
            show: false,
            starIcon,
            starFilledIcon,
            activeSeason: 1
        }
    },
    methods: {
        activeSeasonChanged(activeSeason) {
            this.activeSeason = activeSeason;
        },
        saveShow() {
            this.$store.dispatch('addToMyShows', { show: this.show })
        },
        deleteShow() {
            this.$store.dispatch('removeFromMyShows', { show: this.show })
        },
        goBack() {
            this.$router.push('/');
        }
    },
    computed: {
        image() {
            if ( !this.show.image ) {
                return false;
            }

            return this.show.image.medium.replace(/^http:\/\//i, 'https://');
        },
        isSaved () {
            return this.$store.getters.myShows.find(item => item.tvmaze_id == this.id);
        },
        seasons() {
            if (!this.show ) return false;

            return this.show._embedded.seasons;
        },
        episodes() {
            if (!this.show) return false;

            return this.show._embedded.episodes.filter(item => item.season === this.activeSeason);
        },
    },
    mounted() {
        const vm = this;
        axios.get(`https://api.tvmaze.com/shows/${this.id}?embed[]=seasons&embed[]=episodes`)
        .then(function (response) {
            vm.show = response.data;
            console.log(vm.show);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>

<style lang="scss">
.showFixedTop {
    display: flex;
    align-items: center;
    padding: 0 15px;
    &__back {
        width: 28px;
        height: 28px;
        svg {
            width: 100%;
            height: 100%;
        }
        path {
            fill: #3c3c3b;
        }
    }
    &__title {
        width: calc(100% - 56px);
        padding: 0 16px;
        font-size: 18px;
        margin-bottom: 0;
        font-weight: 600;
    }
    .save-button,
    .delete-button {
        width: 28px;
        height: 28px;
        display: block;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.show {
    padding: 30px 0;
    &__top {
        margin-bottom: 30px;
        min-height: 170px;
    }
    &__image-holder {
        line-height: 0;
        width: 120px;
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
        img {
            border-radius: 5px;
            box-shadow: 0 3px 10px 1px rgba(0,0,0,.05);
        }
    }
    &__title {
        margin-bottom: 15px;
    }
    &__genres {
        font-style: italic;
        margin-bottom: 10px;
    }
    &__summary {
        width: 100%;
        font-size: 16px;
        position: relative;
    }
}
</style>
