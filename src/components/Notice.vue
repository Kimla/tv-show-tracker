<template>
    <transition name="animate-notice">
        <div class="notice" v-if="notice" :class="notice.status" @click="hide()">
            <div class="notice__icon" v-if="notice.status === 'is-success'">
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="#abc788" clip-rule="evenodd" d="M21.652 3.21c-.293-.294-.77-.294-1.06 0L9.41 14.34c-.293.297-.77.297-1.062 0l-4.9-4.99c-.144-.147-.334-.22-.525-.22-.193-.002-.39.07-.536.22L.222 11.298c-.144.148-.222.333-.222.526 0 .194.078.397.223.544l4.94 5.184c.292.297.77.777 1.062 1.07l2.124 2.142c.29.293.768.293 1.06 0l14.367-14.34c.293-.294.293-.777 0-1.07l-2.125-2.14z" fill-rule="evenodd"/></svg>
            </div>
            <div class="notice__icon" v-if="notice.status === 'is-error'">
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="#fa98a1" d="M22.245 4.015c.313.313.313.826 0 1.14l-6.276 6.27c-.314.31-.314.825 0 1.14l6.272 6.27c.313.314.313.827 0 1.14l-2.285 2.278c-.314.312-.828.312-1.142 0l-6.27-6.27c-.314-.314-.83-.314-1.142 0l-6.276 6.266c-.313.312-.828.312-1.14 0l-2.283-2.28c-.313-.314-.313-.827 0-1.14l6.278-6.27c.313-.312.313-.826 0-1.14L1.71 5.147c-.315-.313-.315-.827 0-1.14L3.992 1.73c.315-.313.828-.313 1.142 0L11.405 8c.314.314.828.314 1.14 0l6.277-6.266c.312-.312.826-.312 1.14 0l2.283 2.28z"/></svg>
            </div>
            <div class="notice__text">
                {{ notice.message }}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'notice',
    data() {
        return {

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
        svg {
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
