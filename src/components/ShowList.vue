<template lang="pug">
    div.ShowList
        ShowListItem( v-for="(show, key) in shows" :show="show" :key="show.id" )
</template>

<script>
import ShowListItem from './ShowListItem';

export default {
    name: 'ShowList',
    props: ['shows'],
    components: {
        ShowListItem,
    },
}
</script>

<style lang="scss">
</style>
