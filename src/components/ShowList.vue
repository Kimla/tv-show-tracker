<template lang="pug">
    div.show-list
        div( v-for="(show, key) in shows" :key="show.id" )
            showListItem( :show="show" )
</template>

<script>
import showListItem from './ShowListItem';

export default {
    name: 'showList',
    props: ['shows'],
    components: {
        showListItem,
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss">
    .show-list {

    }
</style>
