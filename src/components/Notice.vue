<template lang="pug">
    transition( name="animate-notice" )
        div.notice( v-if="notice" :class="notice.status" @click="hide()" )

            div.notice__icon( v-if="notice.status === 'is-success'" )
                img( :src="successIcon" )

            div.notice__icon( v-if="notice.status === 'is-error'" )
                img( :src="errorIcon" )

            div.notice__text {{ notice.message }}
</template>

<script>
import errorIcon from '@/assets/error_icon.svg'
import successIcon from '@/assets/success_icon.svg'

export default {
    name: 'notice',
    data() {
        return {
            errorIcon,
            successIcon
        }
    },
    computed: {
        notice() {
            return this.$store.getters.notice;
        }
    },
    methods: {
        hide() {
            this.$store.commit('hideNotice');
        }
    }
}
</script>

<style lang="scss">
.notice {
    position: fixed;
    left: 50%;
    bottom: 30px;
    min-width: 300px;
    transform: translateX(-50%);
    padding: 15px;
    z-index: 100;
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    border: 2px solid #ddd;
    box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.10), 1px 2px 10px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    &__icon {
        line-height: 0;
        margin-right: 10px;
        border: 2px solid #fa98a1;
        padding: 5px;
        border-radius: 100%;
        img {
            width: 16px;
            height: 16px;
        }
    }
    &.is-error {
        background-color: #fef0f1;
        border-color: #fa98a1;
        .notice__icon {
            border-color: #fa98a1;
        }
    }
    &.is-success {
        background-color: #f3f7ed;
        border-color: #abc788;
        .notice__icon {
            border-color: #abc788;
        }
    }
    &__close {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        right: 30px;
        cursor: pointer;
    }
}

.animate-notice-enter-active,
.animate-notice-leave-active {
    transition: .25s;
}
.animate-notice-enter,
.animate-notice-leave-to {
    transform: translate(-50%, 100%);
    opacity: 0;
}
</style>
