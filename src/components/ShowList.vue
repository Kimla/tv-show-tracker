<template>
    <div class="show-list">
        <router-link :to="'/show/'+show.id" class="show-list-item" v-for="(show, key) in shows" :key="show.id">
            <div class="show-list-item__image-holder" v-if="show.image">
                <img :src="show.image.medium">
            </div>
            <div class="show-list-item__content">
                <div class="show-list-item__content-inner">
                    <h2 class="show-list-item__title">{{ show.name }}</h2>
                    <p class="show-list-item__genres">{{ show.genres.join(", ") }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'showList',
    props: ['shows'],
    data () {
        return {

        }
    }
}
</script>

<style lang="scss">
    .show-list {
        &__item {
            width: 100%;
        }
    }
    .show-list-item {
        width: 100%;
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e8e8e8;
        text-decoration: none;
        color: #333;
        &__image-holder {
            width: 80px;
            line-height: 0;
            img {
                max-width: 100%;
                height: auto;
            }
        }
        &__content {
            width: calc(100% - 80px);
            padding-left: 15px;
        }
        &__content-inner {

        }
        &__title {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            line-height: 1.1;
            margin-bottom: 5px;
        }
        &__genres {
            margin: 0;
            font-style: italic;
        }
    }
</style>
