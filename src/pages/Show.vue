<template lang="pug">
    div.show( v-if="show" )

        div.show__image-holder( v-if="image" )
            img.show__image( :src="image" )

        h1.show__title {{ show.name }}
        p.show__genres {{ show.genres.join(", ") }}
        div.show__summary( v-html="show.summary" )

        p <strong>Latest epsiode:</strong> S{{ currentEpisodes.latest.season }}E{{ currentEpisodes.latest.number }} - {{ currentEpisodes.latest.name }} ({{ currentEpisodes.latest.airdate }})
        p( v-if="currentEpisodes.next" ) <strong>Next epsiode:</strong> S{{ currentEpisodes.next.season }}E{{ currentEpisodes.next.number }} - {{ currentEpisodes.next.name }} ({{ currentEpisodes.next.airdate }})

        span.save-button( v-if="!isSaved" @click="saveShow()" )
            img.navigation__icon( :src="starIcon")

        span.delete-button( v-if="isSaved" @click="deleteShow()" )
            img.navigation__icon( :src="starFilledIcon")

        div.seasons
            div.season-holder( v-for="season in seasons" )
                showSeason( :season="season" )
</template>

<script>
import axios from 'axios';
import showSeason from '@/components/ShowSeason';
import starFilledIcon from '@/assets/star_filled.svg'
import starIcon from '@/assets/star_border.svg'

export default {
    name: 'show',
    components: {
        showSeason,
    },
    data() {
        return {
            id: this.$route.params.id,
            show: false,
            episodes: [],
            starIcon,
            starFilledIcon
        }
    },
    methods: {
        saveShow() {
            this.$store.dispatch('addToMyShows', { show: this.show })
        },
        deleteShow() {
            this.$store.dispatch('removeFromMyShows', { show: this.show })
        },
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
            if ( !this.show ) {
                return false;
            }
            let episodes = this.show._embedded.episodes;
            let seasons = {};
            for (var i = 0; i < episodes.length; i++) {
                if ( !seasons[episodes[i].season] ) {
                    seasons[episodes[i].season] = {};
                    seasons[episodes[i].season]["episodes"] = [];
                }
                seasons[episodes[i].season]["label"] = "Season " + episodes[i].season;
                seasons[episodes[i].season]["episodes"].push(episodes[i]);
            }
            return seasons;
        },
        currentEpisodes() {
            let episodes = this.show._embedded.episodes;
            let currentTime = Date.now();
            let results = {};

            for (var i = episodes.length - 1; i >= 0; i--) {
                let episodeDate = Date.parse(episodes[i].airdate);
                if (episodeDate < currentTime) {
                    let latest = episodes[i];
                    let next = false;
                    if (episodes[i + 1]) {
                        next = episodes[i + 1];
                    }
                    return {
                        latest,
                        next
                    };
                    break;
                }
            }
        }
    },
    mounted() {
        const vm = this;
        axios.get(`https://api.tvmaze.com/shows/${this.id}`, {
            params: {
                embed: 'episodes'
            }
        })
        .then(function (response) {
            vm.show = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>

<style lang="scss">
    .show {
        &__image-holder {
            line-height: 0;
            margin-bottom: 10px;
        }
        &__title {
            margin-bottom: 15px;
        }
        &__genres {
            font-style: italic;
            margin-bottom: 10px;
        }
        &__summary {
            max-width: 500px;
        }
    }
    .save-button,
    .delete-button {
        width: 32px;
        height: 32px;
        display: block;
        margin-bottom: 20px;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .seasons {
        padding-top: 10px;
        margin-top: 15px;
        border-top: 1px solid #e8e8e8;
    }
</style>
