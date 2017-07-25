<template>
    <div id="app">
        <navigation></navigation>
        <div class="page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import navigation from './components/Navigation.vue'

export default {
    name: 'app',
    components: {
        navigation,
    },
    created() {
        this.$store.dispatch('LOAD_MY_SHOWS');
    }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss">
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans",
        "Droid Sans", "Helvetica Neue", sans-serif;
        letter-spacing: 0.5px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
        color: #333;
    }
    button {
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
    }
    ul,
    p,
    h1,
    h2,
    h3,
    h4 {
        margin: 0;
        padding: 0;
    }
    h1,
    h2,
    h3,
    h4 {
        font-weight: 300;
    }
    .page {
        padding: 30px 15px;
    }
    h1 {
        font-size: 28px;
        margin-bottom: 20px;
    }
    p {
        margin-bottom: 20px;
        line-height: 1.3;
    }
    b,
    strong {
        font-weight: 600;
    }
</style>
