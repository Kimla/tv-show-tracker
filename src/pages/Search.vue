<template lang="pug">
    div.search
        div.search-bar
            input.search-bar__input( type="text" placeholder="Search here..." ref='search' v-model="keyword" @keyup.enter="searchHandler()" )
            div.search-bar__icon( @click="searchHandler()" )
                <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
        showList( v-if="shows.length > 0" :shows="showsFiltered" )
        loader( v-if="isLoading" )
        div.message( v-if="zeroResults" )
            p No results, try again!
</template>

<script>
import axios from 'axios';
import showList from '@/components/ShowList.vue';
import loader from '@/components/Loader.vue';

export default {
    name: 'search',
    components: {
        showList,
        loader
    },
    data () {
        return {
            shows: [],
            keyword: "",
            zeroResults: false,
            isLoading: false
        }
    },
    computed: {
        showsFiltered() {
            let shows = [];
            for (var i = 0; i < this.shows.length; i++) {
                let show = this.shows[i].show;
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

            axios.get('http://api.tvmaze.com/search/shows', {
                params: {
                    q: vm.keyword
                }
            })
            .then(function (response) {
                if ( response.data.length < 1 ) {
                    vm.zeroResults = true;
                }
                vm.shows = response.data;
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
            svg {
                width: 24px;
                height: 24px;
            }
        }
    }
</style>
