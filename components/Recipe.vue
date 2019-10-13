<template>
    <nuxt-link :to="'/recipes/' + id">
        <article class="recipe">
            <v-card-title primary-title>
                {{title}}
            </v-card-title>
            <v-card-text>
                {{text}}
            </v-card-text>
        </article>
    </nuxt-link>
</template>
<script>
    export default {
        props: ['title', 'text', 'id']
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: red
    }

    .recipe {
        padding: 16px;
        display: flex;
        flex-flow: row wrap;
        box-sizing: border-box;
        width: 280px;
        margin: 8px;
        padding: 8px;
        align-content: center;
        border: 1px solid #ccc;

    }
</style>