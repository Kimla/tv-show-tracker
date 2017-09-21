<template lang="pug">
    div.search
        div.search-bar
            input.search-bar__input( type="text" placeholder="Search here..." ref='search' v-model="keyword" @keyup.enter="searchHandler()" )
            div.search-bar__icon( @click="searchHandler()" )
                img( :src="searchIcon" )
        showList( v-if="showsData.length > 0" :shows="shows" )
        loader( v-if="isLoading" )
        div.message( v-if="zeroResults" )
            p No results, try again!
</template>

<script>
import axios from 'axios';
import showList from '@/components/ShowList';
import loader from '@/components/Loader';
import searchIcon from '@/assets/search_white.svg';
import {slugify, getShowData} from '@/helpers/helpers';

export default {
    name: 'search',
    components: {
        showList,
        loader
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
    .search-bar {
        height: 48px;
        width: 100%;
        position: relative;
        margin-bottom: 30px;
        &__input {
            border: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 12px;
            font-size: 16px;
            border: 1px solid #e8e8e8;
            outline: 0;
            transition: border-color 0.25s;
            border-radius: 0;
            -webkit-appearance: none;
            &:focus {
                border-color: #2196F3;
            }
        }
        &__icon {
            height: 48px;
            width: 48px;
            position: absolute;
            right: 0;
            top: 0;
            background-color: #2196F3;
            padding: 12px;
            img {
                width: 24px;
                height: 24px;
            }
        }
    }
</style>
