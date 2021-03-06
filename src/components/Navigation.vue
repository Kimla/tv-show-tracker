<template lang="pug">
    nav.Navigation.fixedHeader( v-if="showNav" )
        ul.Navigation__list
            li.Navigation__listItem( v-for="item,key in menuItems" )
                router-link.Navigation__link( :to="item.path" )
                    div.Navigation__iconHolder( :class="key" v-html="item.icon" )
                    div.Navigation__label {{ item.label }}
</template>

<script>
import {homeIcon} from '@/helpers/icons'
import {searchIcon} from '@/helpers/icons'
import {myShowsIcon} from '@/helpers/icons'
import {settingsIcon} from '@/helpers/icons'
import {loginIcon} from '@/helpers/icons'
import {registerIcon} from '@/helpers/icons'

export default {
    name: 'Navigation',
    computed: {
        showNav() {
            return this.$route.name !== 'show';
        },
        menuItems() {
            if (this.$store.getters.isLoggedIn) {
                return { ...this.items, ...this.authedItems };
            }

            return { ...this.items, ...this.unAuthedItems };
        }
    },
    data () {
        return {
            activeBarPosition: 0,
            items: {
                home: {
                    icon: homeIcon,
                    label: 'Home',
                    path: '/',
                },
                search: {
                    icon: searchIcon,
                    label: 'Search',
                    path: '/search',
                },
            },
            authedItems: {
                myShows: {
                    icon: myShowsIcon,
                    label: 'Saved',
                    path: '/my-shows',
                },
                settings: {
                    icon: settingsIcon,
                    label: 'Settings',
                    path: '/settings',
                },
            },
            unAuthedItems: {
                login: {
                    icon: loginIcon,
                    label: 'Sign in',
                    path: '/login',
                },
                register: {
                    icon: registerIcon,
                    label: 'Register',
                    path: '/register',
                }
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
        text-align: center;
        padding: 8px 10px;
        cursor: pointer;
        display: block;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -7px;
            margin-top: -7px;
            background-color: $primary;
            border-radius: 100%;
            height: 14px;
            width: 14px;
            opacity: 0;
        }
        &.router-link-exact-active::after {
            animation: effect ease 0.5s;
        }
    }
    &__label {
        font-size: 12px;
        color: #999;
        line-height: 1;
        .router-link-exact-active & {
            color: $primary;
        }
    }
    &__iconHolder {
        width: 25px;
        height: 25px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 6px;
        &.home {
            width: 27px;
            height: 27px;
            margin-bottom: 4px;
        }
        &.search {
            position: relative;
            left: -1px;
        }
        svg {
            width: 100%;
            height: 100%;
        }
        .stroke,
        .fill {
            transition: 0.25s;
        }
        .settings-first,
        .settings-second,
        .settings-third, {
            transition: stroke 0.25s, transform 0.75s;
        }
    }
    .router-link-exact-active .stroke {
        stroke: $primary;
    }
    .router-link-exact-active .fill {
        fill: $primary;
    }
    .router-link-exact-active .myShows {
        animation: beat ease-out 1s;
    }
    .router-link-exact-active .home,
    .router-link-exact-active .register {
        animation: flip ease-out 0.75s;
        animation-fill-mode: forwards;
    }
    .router-link-exact-active .search,
    .router-link-exact-active .login {
        animation: bounce ease-out 1s;
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
    .router-link-exact-active .login .arrow {
        animation: arrow 0.75s;
    }
}
@keyframes effect {
  0%   {
    opacity: 0.8;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(5);
  }
}
@keyframes bounce {
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
