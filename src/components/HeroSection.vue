<template>
    <div class="hero-section">
        <img class="hero-section__background" :src="item.src" alt="">
        <div class="hero-section__overlay"></div>
        <div class="hero-section__inner">
            <h1>Tv shows</h1>
            <p>Keep track of your favorite tv shows.</p>
            <div class="hero-section__buttons">
                <buttonEl v-for="(button, key) in buttons" :key="key" v-bind:button="button"></buttonEl>
            </div>
        </div>
    </div>
</template>

<script>
import buttonEl from './Button.vue'

export default {
    name: 'heroSection',
    components: {
        buttonEl,
    },
    data () {
        return {
            item: {
                src: 'http://thetvdb.com/banners/fanart/original/305288-19.jpg',
                link: '/show/2993'
            },
            buttons: {
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
        margin-top: -30px;
        width: calc(100% + 30px);
        margin-left: -15px;
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
