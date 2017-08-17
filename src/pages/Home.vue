<template lang="pug">
    div.home
        heroSection
        div.popular-shows
            h2 Popular shows
</template>

<script>
import heroSection from '@/components/HeroSection.vue'

export default {
    name: 'home',
    components: {
        heroSection,
    },
}
</script>

<style lang="scss">
    .popular-shows {
        h2 {
            font-weight: 600;
        }
    }
</style>
