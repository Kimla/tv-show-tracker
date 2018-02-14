<template lang="pug">
    nav.Navigation( v-if="showNav" )
        ul.Navigation__list
            li.Navigation__listItem( v-for="item,key in menuItems" )
                router-link.Navigation__link( :to="item.path" )
                    img.Navigation__icon( :src="item.icon" :alt="key" )
        span.Navigation__activeBar( :style="{ left: activeBarPosition + '%' }" )
</template>

<script>
import homeIcon from '@/assets/home.svg'
import searchIcon from '@/assets/search.svg'
import myShowsIcon from '@/assets/star_filled.svg'
import settingsIcon from '@/assets/settings.svg'

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
    methods: {
        setActiveBar() {
            if (this.menuItems[this.$route.name]) {
                this.activeBarPosition = this.menuItems[this.$route.name].order * 25;
            } else {
                this.activeBarPosition = -100;
            }
        }
    },
    mounted() {
        this.setActiveBar();
    }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.Navigation {
    box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.10);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    background-color: #ffffff;
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
        padding: 15px;
        cursor: pointer;
    }
    &__activeBar {
        position: absolute;
        left: 25%;
        bottom: 0;
        height: 4px;
        width: 25%;
        background-color: $primary;
        transition: left 0.25s;
    }
}
</style>
