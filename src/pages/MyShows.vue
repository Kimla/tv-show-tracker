<template lang="pug">
    div.my-shows
        showList( v-if="myShows" :shows="myShows" )
        div.my-shows__message( v-else )
            h3 You have no saved shows, find them
                router-link(:to="'/search'") here!
</template>

<script>
import showList from '@/components/ShowList'

export default {
    name: 'myShows',
    components: {
        showList,
    },
    data() {
        return {

        }
    },
    computed: {
        myShows () {
            if ( this.$store.state.myShows.length < 1 ) {
                return false;
            }

            let myShows = this.$store.state.myShows;

            myShows.sort(function (a, b) {
               return a.name.localeCompare(b.name);
            });

            return myShows;
        }
    },
    beforeCreate() {
        if ( !this.$store.getters.isLoggedIn ) {
            this.$router.replace("/login");
        }
    }
}
</script>

<style lang="scss">
    h3 {
        margin: 0;
        line-height: 1.3;
    }
    a {
        color: #2196F3;
    }
</style>
