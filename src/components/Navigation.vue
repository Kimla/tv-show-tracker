<template lang="pug">
    nav.navigation
        ul.navigation__list
            li.navigation__list-item( v-for="item,key in menuItems" )
                router-link.navigation__link( :to="item.path" )
                    img.navigation__icon( :src="item.icon" :alt="key" )
        span.navigation__active-bar( :style="{ left: activeBarPosition + '%' }" )
</template>

<script>
import homeIcon from '../assets/home.svg'
import searchIcon from '../assets/search.svg'
import myShowsIcon from '../assets/star_filled.svg'
import settingsIcon from '../assets/settings.svg'

export default {
    name: 'navigation',
    watch: {
        '$route' (to, from) {
            if ( this.menuItems[this.$route.name] ) {
                this.activeBarPosition = this.menuItems[this.$route.name].order * 25;
            } else {
                this.activeBarPosition = -100;
            }
        }
    },
    data () {
        return {
            activeBarPosition: 0,
            menuItems: {
                home: {
                    icon: homeIcon,
                    isActive: true,
                    order: 0,
                    path: '/'
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
    beforeMount() {
        if ( this.menuItems[this.$route.name] ) {
            this.activeBarPosition = this.menuItems[this.$route.name].order * 25;
        } else {
            this.activeBarPosition = -100;
        }
    }
}
</script>

<style lang="scss">
    .navigation {
        box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.2);
        position: relative;
        &__list {
            list-style: none;
            display: flex;
        }
        &__list-item {
            width: 25%;
        }
        &__link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            cursor: pointer;
        }
        &__icon {
            fill: #607D8B;
        }
        &__active-bar {
            position: absolute;
            left: 25%;
            bottom: 0;
            height: 3px;
            width: 25%;
            background-color: #2196F3;
            transition: left 0.25s;
        }
    }
</style>
