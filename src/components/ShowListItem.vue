<template lang="pug">
    router-link.ShowListItem( :to="link" )
        div.ShowListItem__imageHolder( v-if="show.image" )
            img.ShowListItem__image( :src="show.image" )
        div.ShowListItem__content
            h2.ShowListItem__title {{ show.title }}
            p.ShowListItem__genres {{ show.genres }}
</template>

<script>
import {slugify} from '@/helpers/helpers';

export default {
    name: 'ShowListItem',
    props: ['show'],
    computed: {
        link() {
            const slug = slugify(this.show.title);
            return `/show/${this.show.tvmaze_id}/${slug}`;
        },
    }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

$imageWidth: 80px;

.ShowListItem {
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    &:first-child {
        margin-top: 35px;
    }
    &__imageHolder {
        width: $imageWidth;
        line-height: 0;
        margin-top: -25px;
        box-shadow: $boxShadow;
    }
    &__image {
        border-radius: $borderRadius;
    }
    &__content {
        width: calc(100% - $imageWidth);
        padding: 5px;
        padding-left: 20px;
    }
    &__title {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.25;
        margin-bottom: 6px;
    }
    &__genres {
        font-style: italic;
    }
}
</style>
