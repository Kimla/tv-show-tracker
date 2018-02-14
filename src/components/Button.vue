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
</style>
