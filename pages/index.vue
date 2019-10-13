<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
            >
              documentation
            </a>.
          </p>
          <!-- <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p> -->
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            nuxt
            to="/inspire"
          >
            Move to Inspire
          </v-btn>
        </v-card-actions>

        <v-card-text>
          <v-text-field
            label="Outlined"
            placeholder="Placeholder"
            outlined
            v-model='text'
            @keyup.enter="add()"
          ></v-text-field>
        </v-card-text>
      </v-card>
      
      <v-card style="padding-top: 16px" v-for='item in todos' :key='item.id'  >
        <v-card-title>
          <v-icon>mdi-mouse</v-icon>{{item.title}}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'


export default {
  components: {
    Logo,
    VuetifyLogo
  },


  data(){
    return{
      text: '',
      todos: [],
      idTodo: 0,
    }
  },

  methods: {
    add() {
        if (this.text.trim().length == 0) {
          return
        }
        this.todos.push({
          id: this.idTodo,
          title: this.text
        })
        this.text = '',
        this.idTodo++,

        console.log(this.todos);
        localStorage.setItem('local_todos', JSON.stringify(this.todos));
        console.log('Todos changed!'+ JSON.stringify(this.todos));
      },
  },
  mounted() {
    console.log('App mounted!');
    if (localStorage.getItem('local_todos')) 
    this.todos = JSON.parse(localStorage.getItem('local_todos'));
  },
  
}
</script>
