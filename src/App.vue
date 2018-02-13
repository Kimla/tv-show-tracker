<template lang="pug">
    div#app
        navigation

        div.pageWrapper
            transition(name="transform" mode="out-in")
                router-view

        notice
</template>

<script>
import navigation from './components/Navigation';
import notice from './components/Notice';

export default {
    name: 'app',
    components: {
        navigation,
        notice
    },
    created() {
        const token = localStorage.getItem("token");
        if ( token ) {
            this.$store.dispatch('loadMyShows');
        }
    }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss">
@import './styles/main.scss';
    * {
        box-sizing: border-box;
    }
    html,
    body {
        height: 100%;
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
        color: #3c3c3b;
        background-color: #fefefe;
    }
    .pageWrapper {
        min-height: 100vh;
        padding-top: 54px;
        display: flex;
    }
    button {
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        color: inherit;
    }
    a {
        color: inherit;
        text-decoration: none;
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
            margin-bottom: 20px;
        }
        .input-holder:last-child {
            margin-bottom: 0;
        }
        .input {
            width: 100%;
            padding-bottom: 10px;
            font-size: 16px;
            border: 0;
            border-bottom: 2px solid #e7edec;
            outline: 0;
            border-radius: 0;
            -webkit-appearance: none;
            transition: border-color 0.25s;
            color: #3c3c3b;
            &:focus {
                border-color: #2196F3;
            }
        }
        .input::placeholder {
            color: #3c3c3b;
            font-weight: 400;
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
        &__bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .form-link {
            font-size: 15px;
        }
    }

    .container {
        padding: 0 15px;
    }

    .transform-enter {
        opacity: 0;
        transform: translateY(30px)
    }

    .transform-enter-active {
        transition: 0.25s;
    }

    .transform-leave {

    }

    .transform-leave-active {
        transition: 0.25s;
        opacity: 0;
    }

</style>
