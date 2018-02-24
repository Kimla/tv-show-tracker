<template lang="pug">
    div.show( v-if="show" )
        div.showFixedTop.fixedHeader
            div.showFixedTop__back( @click="goBack()" )
                img.showFixedTop__backArrow( src="../assets/arrow-grey.svg" )
            h1.showFixedTop__title {{ show.name }}
            span.save-button( :class="{ isSaved: isSaved }" @click="saveShow()" v-html="hearthIcon" )

        div.container
            div.show__top
                div.show__image-holder( v-if="image" )
                    img.show__image( :src="image" )
                div.show__summary( v-html="show.summary" )

            div.trailerButtonHolder( v-if="trailer" )
                button.button( @click="playTrailer" ) Play trailer

            div.trailerHolder( v-if="trailerPlaying" @click="trailerPlaying = false" )
                div.trailerHolder__inner
                    div.iframeWrapper
                        <iframe :src="trailerPlaying" allowfullscreen scrolling="no"></iframe>

            ShowSeasons( :seasons="seasons" :active="activeSeason" @changed="activeSeasonChanged" )
            ShowEpisode( v-for="episode in episodes" :episode="episode" :key="episode.id" )
            p.noEpisodesFound( v-if="episodes.length < 1" ) No episodes found in this season
</template>

<script>
import axios from 'axios';
import {api} from '@/helpers/helpers';
import ShowSeasons from '@/components/ShowSeasons';
import ShowEpisode from '@/components/ShowEpisode';
import {hearthIcon} from '@/helpers/icons';

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
            trailer: false,
            trailerPlaying: false,
            activeSeason: 1,
            hearthIcon,
        }
    },
    methods: {
        activeSeasonChanged(activeSeason) {
            this.activeSeason = activeSeason;
        },
        saveShow() {
            if (this.isSaved) {
                this.$store.dispatch('removeFromMyShows', { show: this.show })
            } else {
                this.$store.dispatch('addToMyShows', { show: this.show })
            }
        },
        goBack() {
            this.$router.push('/');
        },
        playTrailer() {
            let width = 400;

            if (window.innerWidth > 999) {
                width = 854;
            }

            this.trailerPlaying = this.trailer + '&width=' + width;
        },
        getTrailer() {
            api.get(`/getTrailer/${this.show.externals.imdb}`)
                .then(response => {
                    console.log(response.data);
                    if (response.data !== 'error') {
                        this.trailer = response.data;
                    }
                })
                .catch(error => console.log(error));
        }
    },
    computed: {
        image() {
            if (!this.show.image) return false;

            return this.show.image.medium.replace(/^http:\/\//i, 'https://');
        },
        isSaved () {
            return this.$store.getters.myShows.find(item => item.tvmaze_id == this.id);
        },
        seasons() {
            return this.show._embedded.seasons;
        },
        episodes() {
            return this.show._embedded.episodes.filter(item => item.season === this.activeSeason);
        },
    },
    created() {
        axios.get(`https://api.tvmaze.com/shows/${this.id}?embed[]=seasons&embed[]=episodes`)
            .then(response => {
                this.show = response.data;
                this.getTrailer();
            })
            .catch(error => console.log(error));
    }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.trailerHolder {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparentize(#000000, 0.2);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    &__inner {
        width: 400px;
        min-width: 400px;
        max-width: 100%;
        @media (min-width: 1000px) {
            width: 854px;
        }
    }
}
.iframeWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
}
.showFixedTop {
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 59px;
    &__back {
        width: 24px;
        height: 24px;
        img {
            width: 100%;
            height: 100%;
        }
        transform: rotate(180deg);
    }
    &__title {
        width: calc(100% - 56px);
        padding: 0 16px;
        font-size: 18px;
        margin-bottom: 0;
        font-weight: 600;
    }
    .save-button {
        width: 28px;
        height: 28px;
        display: block;
        cursor: pointer;
        svg {
            width: 100%;
            height: 100%;
        }
        path {
            transition: 0.25s;
            stroke: $primary;
        }
        &.isSaved path {
            stroke: transparent;
            fill: $primary;
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
