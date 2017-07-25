<template>
    <div v-if="season" class="show-season">
        <div class="show-season__header">
            <h3 @click="toggle()">{{ season.label }}</h3>
        </div>
        <div v-if="isOpen" class="episodes">
            <div class="episode" v-for="episode in season.episodes">
                <h4>{{ episode.name }}</h4>
                <p>Airdate: {{ episode.airdate }}</p>
            </div>
        </div>
    </div>
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
