<template lang="pug">
    div.Search
        div.container
            div.searchBox
                div.SearchBar
                    input.SearchBar__input( type="text" placeholder="Search here..." ref='search' v-model="keyword" @keyup.enter="searchHandler()" )
                    div.SearchBar__icon( @click="searchHandler()" )
                        img( :src="searchIcon" )
            ShowList( v-if="showsData.length > 0" :shows="shows" )
            Loader( v-if="isLoading" )
            div.Search__message( v-if="zeroResults" )
                p No results, try again!
</template>

<script>
import axios from 'axios';
import ShowList from '@/components/ShowList';
import Loader from '@/components/Loader';
import searchIcon from '@/assets/search.svg';
import {getShowData} from '@/helpers/helpers';

export default {
    name: 'Search',
    components: {
        ShowList,
        Loader
    },
    data () {
        return {
            showsData: [],
            keyword: "",
            zeroResults: false,
            isLoading: false,
            searchIcon
        }
    },
    computed: {
        shows() {
            let showsOrg = this.showsData.map(item => item.show);
            let shows = [];

            for (let i = 0; i < showsOrg.length; i++) {
                const show = getShowData(showsOrg[i]);
                shows.push(show);
            }

            return shows;
        }
    },
    methods: {
        searchHandler() {
            this.isLoading = true;
            this.zeroResults = false;
            const vm = this;

            axios.get('https://api.tvmaze.com/search/shows', {
                params: {
                    q: vm.keyword
                }
            })
            .then(function (response) {
                if ( response.data.length < 1 ) {
                    vm.zeroResults = true;
                }
                vm.showsData = response.data;
                vm.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    mounted() {
        this.$refs.search.focus();
    }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.Search {
    width: 100%;
    padding-top: 30px;
    &__message {
        text-align: center;
        font-weight: 600;
        font-size: 18px;
    }
}

.SearchBar {
    height: 48px;
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    &__input {
        padding: 13px;
        border: 2px solid #e8e8e8;
        transition: border-color 0.25s;
        &:focus {
            border-color: $primary;
        }
    }
    &__icon {
        height: 48px;
        width: 48px;
        position: absolute;
        right: 0;
        top: 0;
        background-color: $primary;
        padding: 11px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
