<template>
    <v-layout row wrap class="single">
        <section>
            <h1>it is {{ recipe.title }} - {{recipe.id}}</h1>
            <h2>{{recipe.text}}</h2>
            <p>
                {{recipe.description}}
            </p>
        </section>

    </v-layout>
</template>

<script>
    export default {
        asyncData(context) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        recipe: [{
                            id: "5",
                            title: " from server",
                            text: "hijibiji",
                            description: "bla bla bla"
                        },
                        {
                            id: "6",
                            title: " from server 2",
                            text: "hijibiji again",
                            description: "bla bla bla again"

                        }].find(el => el.id === context.params.id)
                    })
                }, 1500)
            })
        }

    }
</script>

<style scoped>
    .single {
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 30px;

    }
</style>