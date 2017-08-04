<template lang="pug">
    div#app
        navigation
        div.page
            router-view
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
    a {
        color: #2196F3;
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
    .form {
        width: 500px;
        margin: 0 auto;
        max-width: 100%;
        .input-holder {
            margin-bottom: 16px;
        }
        .input {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 1px solid #e8e8e8;
            outline: 0;
            border-radius: 0;
            -webkit-appearance: none;
            transition: border-color 0.25s;
            &:focus {
                border-color: #2196F3;
            }
        }
        .label {
            display: block;
            margin-bottom: 8px;
        }
        .button {
            margin: 0;
        }
        .button-holder {
            text-align: right;
        }
    }
</style>
