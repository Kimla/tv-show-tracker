<template lang="pug">
    div.show-list
        router-link.show-list-item( v-for="(show, key) in shows" :key="show.id" :to="'/show/'+show.id" )
            div.show-list-item__image-holder( v-if="show.image" )
                img.show-list-item__image( :src="show.image.medium" )
            div.show-list-item__content
                div.show-list-item__content-inner
                    h2.show-list-item__title {{ show.name }}
                    p.show-list-item__genres {{ show.genres.join(", ") }}
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
