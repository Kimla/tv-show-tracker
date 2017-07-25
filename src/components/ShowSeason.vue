<template lang="pug">
    div.show-season( v-if="season" )
        div.show-season__header
            h3.show-season__heading( @click="toggle()" ) {{ season.label }}
        div.episodes( v-if="isOpen" )
            div.episode( v-for="episode in season.episodes" )
                h4.episode.title {{ episode.name }}
                p.episode.airdate Airdate: {{ episode.airdate }}
</template>

<script>
export default {
    name: 'showSeason',
    props: ['season'],
    data () {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggle() {
            if ( this.isOpen ) {
                this.isOpen = false;
            } else {
                this.isOpen = true;
            }
        }
    },
}
</script>

<style lang="scss">
    .show-season {
        &__header {
            padding: 10px 0;
            border-bottom: 1px solid #e8e8e8;
            cursor: pointer;
            h3 {
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
    .episodes {
        padding: 15px 0;
    }
    .episode {
        line-height: 1.3;
        h4 {
            font-weight: 600;
        }
    }
</style>
