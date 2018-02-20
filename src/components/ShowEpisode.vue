<template lang="pug">
    div.episode
        h3.episode__header( @click="isOpen = !isOpen" ) {{ episode.number }}: {{ episode.name }}
        div.episode__content( v-if="isOpen" )
            p.episode__airDate <strong>Airdate:</strong> {{ episode.airdate }}
            div.episode__summary( v-html="episode.summary" )
</template>

<script>
export default {
    props: ['episode'],
    data() {
        return {
            isOpen: false,
        }
    },
}
</script>

<style lang="scss">
.episode {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
    &__header {
        font-size: 16px;
    }
    &__content {
        padding-top: 20px;
        padding-bottom: 8px;
    }
    &__airDate {
        margin-bottom: 14px;
    }
}
</style>
