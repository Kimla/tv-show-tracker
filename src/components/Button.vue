<template lang="pug">
    router-link.button( v-if="button.link" :to="button.link" )
        div.button__inner {{ button.label }}

    div.button( v-else @click="clicked()" )
        div.button__inner {{ button.label }}
</template>

<script>

export default {
    name: 'button',
    props: ['button'],
    methods: {
        clicked() {
            this.$emit('Clicked');
        }
    }
}
</script>

<style lang="scss">
    .button {
        cursor: pointer;
        align-items: center;
        border-radius: 2px;
        display: inline-flex;
        height: 36px;
        flex: 0 1 auto;
        font-size: 12px;
        font-weight: 500;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 6px 8px;
        min-width: 88px;
        outline: 0;
        text-transform: uppercase;
        text-decoration: none;
        transition: .3s cubic-bezier(.25,.8,.25,1),color 1ms;
        position: relative;
        vertical-align: middle;
        will-change: box-shadow;
        box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
        color: #fff;
        background-color: #009688;
        border-color: #009688;
        letter-spacing: 1px;
        &__inner {
            align-items: center;
            border-radius: inherit;
            color: inherit;
            display: flex;
            height: 100%;
            -ms-flex: 1 0 auto;
            flex: 1 0 auto;
            -ms-flex-pack: center;
            justify-content: center;
            margin: 0 auto;
            padding: 0 16px;
            transition: .3s cubic-bezier(.25,.8,.25,1);
            white-space: nowrap;
            &:before {
                border-radius: inherit;
                text-decoration: inherit;
                vertical-align: inherit;
                box-sizing: inherit;
                color: inherit;
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                opacity: .12;
                transition: .3s cubic-bezier(.25,.8,.25,1);
                width: 100%;
            }
        }
        &:hover {
            .button__inner:before {
                background-color: currentColor;
            }
        }
    }
</style>
