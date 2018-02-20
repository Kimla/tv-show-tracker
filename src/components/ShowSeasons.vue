<template lang="pug">
    div.seasons( v-if="seasons" )
        div.seasons__active( @click="toggle" )  Season {{ activeSeason }}
            span.seasons__arrow ▶
        div.seasons__holder( :class="{ isOpen: isOpen }" )
            div.seasons__item( v-for="season in seasons" @click="change(season.number)" ) Season {{ season.number }}
</template>

<script>
export default {
    name: 'showSeasons',
    props: ['seasons', 'active'],
    data () {
        return {
            isOpen: false,
        }
    },
    computed: {
        activeSeason() {
            return this.active;
        }
    },
    methods: {
        change(number) {
            this.$emit('changed', number);
            this.isOpen = false;
        },
        toggle() {
            this.isOpen = !this.isOpen;
        }
    },
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.seasons {
    margin: 30px 0;
    text-align: left;
    padding: 12px 0;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    background-color: $primary;
    box-shadow: $boxShadow;
    &__holder {
        transform: scaleY(0);
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        background-color: #ffffff;
        transition: 0.35s;
        transform-origin: top;
        box-shadow: $boxShadow;
        &.isOpen {
            transform: scaleY(1);
        }
    }
    &__arrow {
        display: inline-block;
        font-size: 14px;
        margin-left: 10px;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%) rotate(90deg);
    }
    &__active {
        padding: 0 15px;
    }
    &__item {
        padding: 10px 15px;
        border-bottom: 1px solid #f8f8f8;
        font-size: 14px;
        &:last-child {
            border-bottom: 0;
        }
    }
}
</style>
