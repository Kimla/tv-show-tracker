<template>
    <div class="home">
        <heroSection></heroSection>
        <div class="popular-shows">
            <h2>Popular shows</h2>
        </div>
    </div>
</template>

<script>
import heroSection from './HeroSection.vue'

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
