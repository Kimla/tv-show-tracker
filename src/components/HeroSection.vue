<template lang="pug">
    div.HeroSection
        img.HeroSection__background.ab100( src="../assets/stranger_things.jpg" )
        div.HeroSection__overlay.ab100
        div.HeroSection__inner
            h1.HeroSection__heading Tv shows
            p.HeroSection__preamble Keep track of your favorite tv shows.
            div.HeroSection__buttons
                buttonEl( v-for="(button, key) in buttons" :key="key" :button="button" )
</template>

<script>
import buttonEl from './Button';
import backgroundImage from '@/assets/stranger_things.jpg';

export default {
    name: 'HeroSection',
    components: {
        buttonEl,
    },
    data() {
        return {
            loggedOutButtons:  {
                register: {
                    label: 'Search',
                    link: '/search',
                },
                login: {
                    label: 'My shows',
                    link: '/my-shows',
                }
            },
            loggedInButtons: {
                register: {
                    label: 'Register',
                    link: '/register',
                },
                login: {
                    label: 'Login',
                    link: '/login',
                }
            }
        }
    },
    computed: {
        buttons() {
            if (this.$store.getters.isLoggedIn) {
                return this.loggedInButtons;
            }
            return this.loggedOutButtons;
        }
    }
}
</script>

<style lang="scss">
.HeroSection {
    width: 100%;
    min-height: 350px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-bottom: 30px;
    &__background {
        object-fit: cover;
    }
    &__overlay {
        background-color: transparentize(#000, 0.65);
    }
    &__inner {
        width: 500px;
        text-align: center;
        position: relative;
        max-width: 100%;
        padding: 50px 15px;
        margin-bottom: 50px;
    }
    &__heading {
        font-weight: 400;
        font-size: 36px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
    &__preamble {
        margin-bottom: 40px;
    }
    &__buttons {
        margin-left: -12px;
        margin-right: -12px;
    }
    .button {
        margin: 0 12px;
    }
}
</style>
