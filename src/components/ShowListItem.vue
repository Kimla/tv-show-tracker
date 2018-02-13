<template lang="pug">
    router-link.show-list-item(  :to="link" )
        div.show-list-item__image-holder( v-if="show.image" )
            img.show-list-item__image( :src="show.image" )
        div.show-list-item__content
            div.show-list-item__content-inner
                h2.show-list-item__title {{ show.title }}
                p.show-list-item__genres {{ show.genres }}
                div.show-list-item__episodes( v-if="currentEpisodes" )
                    p <strong>Latest ep:</strong> S{{ currentEpisodes.latest.season }}E{{ currentEpisodes.latest.number }} - ({{ currentEpisodes.latest.airdate }})
                    p( v-if="currentEpisodes.next" ) <strong>Next ep:</strong> S{{ currentEpisodes.next.season }}E{{ currentEpisodes.next.number }} - ({{ currentEpisodes.next.airdate }})
</template>

<script>
import {slugify} from '@/helpers/helpers';

export default {
    props: ['show'],
    computed: {
        link() {
            const slug = slugify(this.show.title);
            return `/show/${this.show.tvmaze_id}/${slug}`;
        },
        currentEpisodes() {
            return false;

            if ( !this.show._embedded || !this.show._embedded.episodes ) {
                return false;
            }
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
    }
}
</script>

<style lang="scss">
.show-list-item {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 3px 10px 1px rgba(0,0,0,.05);
    &__image-holder {
        width: 80px;
        line-height: 0;
        margin-top: -25px;
        box-shadow: 0 3px 10px 1px rgba(0,0,0,.05);
        img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
    }
    &__content {
        width: calc(100% - 80px);
        padding: 5px;
        padding-left: 20px;
        p {
            margin-bottom: 5px;
        }
    }
    &__content-inner {

    }
    &__title {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        line-height: 1.25;
        margin-bottom: 5px;
    }
    &__genres {
        margin: 0;
        font-style: italic;
    }
}
</style>
