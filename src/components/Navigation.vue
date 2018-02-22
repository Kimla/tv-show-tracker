<template lang="pug">
    nav.Navigation.fixedHeader( v-if="showNav" )
        ul.Navigation__list
            li.Navigation__listItem( v-for="item,key in menuItems" )
                router-link.Navigation__link( :to="item.path" )
                    div.Navigation__iconHolder( :class="key" v-html="item.icon" )

        span.Navigation__activeBar( :style="{ left: activeBarPosition + '%' }" )
</template>

<script>
import {homeIcon} from '@/helpers/icons'
import {searchIcon} from '@/helpers/icons'
import {myShowsIcon} from '@/helpers/icons'
import {settingsIcon} from '@/helpers/icons'

export default {
    name: 'Navigation',
    watch: {
        '$route' (to, from) {
            this.setActiveBar();
        }
    },
    computed: {
        showNav() {
            return this.$route.name !== 'show';
        },
    },
    data () {
        return {
            activeBarPosition: 0,
            menuItems: {
                home: {
                    icon: homeIcon,
                    isActive: true,
                    order: 0,
                    path: '/',
                },
                search: {
                    icon: searchIcon,
                    isActive: false,
                    order: 1,
                    path: '/search'
                },
                myShows: {
                    icon: myShowsIcon,
                    isActive: false,
                    order: 2,
                    path: '/my-shows'
                },
                settings: {
                    icon: settingsIcon,
                    isActive: false,
                    order: 3,
                    path: '/settings'
                },
            }
        }
    },
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.Navigation {
    &__list {
        list-style: none;
        display: flex;
    }
    &__listItem {
        width: 25%;
    }
    &__link {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 15px;
        cursor: pointer;
    }
    &__iconHolder {
        width: 28px;
        height: 28px;
        &.home {
            width: 29px;
            height: 29px;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
