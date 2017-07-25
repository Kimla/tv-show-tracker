<template lang="pug">
    div.show(v-if="show")

        div.show__image-holder( v-if="show.image" @click="showTrailer()" )
            img.show__image( :src="show.image.medium" )

        h1.show__title {{ show.name }}
        p.show__genres {{ show.genres.join(", ") }}
        div.show__summary( v-html="show.summary" )

        p <strong>Latest epsiode:</strong> S{{ currentEpisodes.latest.season }}E{{ currentEpisodes.latest.number }} - {{ currentEpisodes.latest.name }} ({{ currentEpisodes.latest.airdate }})
        p( v-if="currentEpisodes.next" ) <strong>Next epsiode:</strong> S{{ currentEpisodes.next.season }}E{{ currentEpisodes.next.number }} - {{ currentEpisodes.next.name }} ({{ currentEpisodes.next.airdate }})

        span.save-button( v-if="!isSaved" @click="saveShow()" )
            <svg fill="#607D8B" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>

        span.delete-button( v-if="isSaved" @click="deleteShow()" )
            <svg fill="#607D8B" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>

        div.seasons
            div.season-holder( v-for="season in seasons" )
                showSeason( :season="season" )
</template>

<script>
import showSeason from './ShowSeason.vue'

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
        }
    },
    methods: {
        saveShow() {
            this.$store.dispatch('ADD_TO_MY_SHOWS', { show: this.show })
        },
        deleteShow() {
            this.$store.dispatch('REMOVE_FROM_MY_SHOWS', { show: this.show })
        },
        showTrailer() {
            console.log("show trailer");
        }
    },
    computed: {
        isSaved () {
            let shows = this.$store.state.myShows;
            for (var i = 0; i < shows.length; i++) {
                if ( shows[i].id == this.id ) {
                    return true;
                }
            }
            return false;
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
        let url = 'http://api.tvmaze.com/shows/' + this.id + '?embed=episodes';
        var self = this;
        fetch(url, {
            method: 'GET',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.show = data;
            console.log(self.show.image.original);
            console.log(data);
        }).catch(function(response) {
            console.log(response);
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
        svg {
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
