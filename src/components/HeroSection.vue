<template lang="pug">
    div.HeroSection
        picture.HeroSection__background.ab100
          <source class="HeroSection__background ab100" srcset="../assets/stranger_things_small.webp" type="image/webp">
          <source class="HeroSection__background ab100" srcset="../assets/stranger_things_small.jpg" type="image/jpeg">
          <img class="HeroSection__background ab100" src="../assets/stranger_things_small.jpg" alt="Stranger Things">
        div.HeroSection__overlay.ab100
        div.HeroSection__inner
            h1.HeroSection__heading Tv shows
            p.HeroSection__preamble Keep track of your favorite tv shows.
            div.HeroSection__buttons
                router-link.button( v-for="(button, key) in buttons" :key="key" :to="button.link" ) {{ button.label }}
</template>

<script>
export default {
    name: 'HeroSection',
    data() {
        return {
            loggedInButtons:  {
                register: {
                    label: 'Search',
                    link: '/search',
                },
                login: {
                    label: 'My shows',
                    link: '/my-shows',
                }
            },
            loggedOutButtons: {
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
$buttonMargin: 12px;

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
        margin-left: -$buttonMargin;
        margin-right: -$buttonMargin;
    }
    .button {
        margin: 0 $buttonMargin;
    }
}
</style>
