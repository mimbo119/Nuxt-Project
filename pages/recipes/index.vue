<template>
    <v-layout row wrap justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-card>
                <div justify-center align-center class="containerRecipe">
                    <article class="recipe">
                        <v-card-title primary-title>
                            Title
                        </v-card-title>
                        <v-card-text>
                            Item 1
                        </v-card-text>
                    </article>
                    <nuxt-link :to="'/recipes/' + id">
                        <article class="recipe" :id="2">
                            <v-card-title primary-title>
                                Title 2
                            </v-card-title>
                            <v-card-text>
                                Item 2
                            </v-card-text>
                        </article>
                    </nuxt-link>
                    <Recipe title="sea food" text="awesome" id="3" />
                    <Recipe title="fast food" text="double awesome" id="4" />
                    <Recipe
                    v-for="item in reci"
                    :key="item.id"
                    :title="item.title"
                    :text="item.text"
                    :id="item.id"
                    />
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import Recipe from "@/components/Recipe";
    export default {

        components: {
            Recipe
        },
        asyncData(){
            return new Promise((resolve, reject) => {
                setTimeout(() =>{
                    resolve({
                        reci:[{
                            id:"5",
                            title: " from server",
                            text: "hijibiji"
                        },
                        {
                            id:"6",
                            title: " from server 2",
                            text: "hijibiji again"
                        }]
                    })
                },1000)
            })
        }

    }
</script>

<style>
    .containerRecipe {
        margin: 16px;
        align-content: center;
    }

    ;

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