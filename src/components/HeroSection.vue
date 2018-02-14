<template lang="pug">
    div.hero-section
        img.hero-section__background( :src="item.src" )
        div.hero-section__overlay
        div.hero-section__inner
            h1.hero-section__heading Tv shows
            p.hero-section__ingress Keep track of your favorite tv shows.
            div.hero-section__buttons
                buttonEl( v-for="(button, key) in buttons" :key="key" :button="button" )
</template>

<script>
import buttonEl from './Button';
import backgroundImage from '@/assets/stranger_things.jpg';

export default {
    name: 'heroSection',
    components: {
        buttonEl,
    },
    data() {
        return {
            item: {
                src: backgroundImage,
                link: '/show/2993'
            },
        }
    },
    computed: {
        buttons() {
            if ( this.$store.getters.isLoggedIn ) {
                return {
                    register: {
                        label: 'Search',
                        link: '/search',
                    },
                    login: {
                        label: 'My shows',
                        link: '/my-shows',
                    }
                }
            }

            return {
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
    }
}
</script>

<style lang="scss">
.hero-section {
    width: 100%;
    min-height: 350px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 0, 100% 0, 100% 95%, 0% 100%);
    color: #fff;
    margin-bottom: 30px;
    &__background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
    }
    &__overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: transparentize(#000, 0.75);
    }
    &__inner {
        width: 500px;
        text-align: center;
        position: relative;
        max-width: 100%;
        padding: 50px 15px;
        margin-bottom: 50px;
        h1 {
            color: #fff;
            font-size: 42px;
        }
        p {
            margin-bottom: 30px;
        }
    }
}
</style>
