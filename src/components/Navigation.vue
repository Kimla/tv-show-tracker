<template lang="pug">
    nav.Navigation.fixedHeader( v-if="showNav" )
        ul.Navigation__list
            li.Navigation__listItem( v-for="item,key in menuItems" )
                router-link.Navigation__link( :to="item.path" )
                    div.Navigation__iconHolder( :class="key" v-html="item.icon" )
</template>

<script>
import {homeIcon} from '@/helpers/icons'
import {searchIcon} from '@/helpers/icons'
import {myShowsIcon} from '@/helpers/icons'
import {settingsIcon} from '@/helpers/icons'

export default {
    name: 'Navigation',
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
        padding: 0 15px;
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
        .yellow {
            transition: 0.25s;
        }
        &.myShows .yellow {
            transition: 0s;
        }
    }
    .router-link-exact-active .yellow {
        stroke: darken($primary, 15%);
    }
    .router-link-exact-active .myShows {
        animation: beat ease-out 1s;
    }
    .router-link-exact-active .home {
        animation: flip ease 1s;
        animation-fill-mode: forwards;
    }
    .router-link-exact-active .search {
        animation: search ease-out 1s;
    }
    .router-link-exact-active .settings-first {
        transform: translateY(5px);
    }
     .router-link-exact-active .settings-second {
        transform: translateY(-8px);
    }
    .router-link-exact-active .settings-third {
        transform: translateY(8px);
    }
}

@keyframes search {
    0%, 20%, 50%, 80%, 100% {transform: rotate(0deg);}
    40% {transform: rotate(20deg);}
    60% {transform:rotate(10deg);}
}

@keyframes flip {
    from { transform: rotateY(0deg); }
      to { transform: rotateY(180deg); }
}

@keyframes beat {
    0%, 20%, 50%, 80%, 100% {transform: scale(1);}
    40% {transform: scale(1.15);}
    60% {transform:scale(1.1);}
}
</style>
