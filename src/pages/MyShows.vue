<template lang="pug">
    div.MyShows
        div.container
            showList( v-if="myShows" :shows="myShows" )
            div.MyShows__message( v-else )
                p You currently don't have any saved shows.
                router-link.button(:to="'/search'") Find shows
</template>

<script>
import showList from '@/components/ShowList'

export default {
    name: 'MyShows',
    components: {
        showList,
    },
    computed: {
        myShows () {
            let myShows = this.$store.getters.myShows;

            if ( myShows < 1 ) {
                return false;
            }

            myShows.sort(function (a, b) {
               return a.title.localeCompare(b.title);
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
.MyShows {
    width: 100%;
    padding-top: 15px;
    &__message {
        padding: 15px 0;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
    }
}
</style>
