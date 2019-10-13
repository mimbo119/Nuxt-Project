<template>
    <div class="main">
        <div justify-center style="text-align: center">
            <logo style="height: 128px !important" />
            <h1>Todo List</h1>
        </div>
        <div class="todo-input">
            <input type="text" v-model="newTodo" placeholder="something"
                style="width: 95%; border-style: ridge; border-color: lightblue" @keyup.enter="addTodo()">
        </div>
        <todo-list class="todo-item" v-for="(todo , index) in todoFilter" :key="todo.id" :todo="todo" :index="index"
            @remove='remove' @finish='finish' :checkAll="!anyRemaining">
            <!-- <input type="checkbox" v-model="todo.completed">
            <div class="todo-left">
                <div v-if="!todo.editing" @dblclick="edit(todo)" class="todo-label" :class="{ completed : todo.completed}">{{todo.title}}</div>
                <input v-else class="todo-edit" type="text" v-model="todo.title" v-on:keyup.enter="done(todo)" @blur="done(todo)" v-on:keyup.esc="cancel(todo)" v-focus >
            </div>
            <div class="remove" @click="remove(index)">
                &times;
            </div> -->

        </todo-list>
        <div class="extra">
            <div><label><input type="checkbox" :checked="!anyRemaining" v-on:change="checkAll()"> Check All </label>
            </div>
            <div class="buttons">
                <button :class="( filter == 'all') ? 'active' : ''" @click="changeFilter('all')">
                    All
                </button>
                <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">
                    Active
                </button>
                <button :class="{ active: filter == 'completed' }" @click="changeFilter('completed')">
                    Completed
                </button>
                <button v-if="showClear" v-on:click="clearCompleted">
                    Clear Completed
                </button>
            </div>
            <div>{{ remaining }} items left</div>
        </div>
    </div>
</template>


<script>
    import TodoList from '../../components/TodoList'
    import Logo from '~/components/Logo.vue'

    export default {

        components: {
            Logo,
            TodoList
        },

        data() {
            return {
                newTodo: '',
                id: 1,
                before: '',
                //filter: 'all',
                todos: [{
                    id: '1',
                    title: '11',
                    completed: false,
                    editing: false
                }]
            }
        },

        created() {
            this.$eventBus.$on('remove', (index) => this.remove(index));
            //console.log(this.$store.state.todos)
            this.$store.dispatch('getFrom')
        },
        beforeDestroy() {
            this.$eventBus.$off('remove', (index) => this.remove(index));
        },

        methods: {
            addTodo() {
                if (this.newTodo.trim().length == 0) {
                    return;
                }

                this.$store.dispatch('addTodo', {
                    id: this.id,
                    title: this.newTodo,
                });

                this.newTodo = '';
                this.id++;
            },
            remove(index) {
                this.$store.dispatch('removeX', index)
                //this.$store.state.todos.splice(index, 1);
            },
            edit(todo) {
                this.before = todo.title;
                todo.editing = true;
            },
            done(todo) {
                if (todo.title.trim() == '') {
                    todo.title = this.before;
                }
                todo.editing = false;

            },
            cancel(todo) {
                todo.title = this.before;
                todo.editing = false;

            },
            checkAll() {
                this.$store.dispatch('checkAllX', event.target.checked);
            },
            clearCompleted() {
                //console.log(this.$store.state.todos)
                this.$store.dispatch('clearX');
            },
            finish(data) {
                const index = this.$store.state.todos.findIndex(item => item.id == data.id)
                this.$store.state.todos.splice(index, 1, data);
            },
            changeFilter(filter){
                //console.log(filter)
                this.$store.dispatch('changeFilterX', filter)
            },
        },

        computed: {
            remaining() {
                //console.log(this.$store.state.todos)
                return this.$store.getters.remaining; 
            },
            anyRemaining() {
                return this.remaining != 0;
            },
            todoFilter() {
                //console.log(this.$store.mutations.todoFilter);
                return this.$store.getters.todoFilter;
            },
            showClear() {
                return this.$store.getters.showClear;
            },
            filter(){
                return this.$store.state.filter;
            },
        }
    }    
</script>

<style>
    h1 {
        align-content: center;
        font-size: 32px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

    }

    .main {
        align-items: center;
        align-content: center;
        padding: 16px;
    }

    .todo-input {
        width: 100%;
        height: 64px;
        padding: 8px;
        margin: 16px;
        border: 2px black;
    }

    .todo-item {
        display: flex;
        font-size: 24px;
        justify-content: space-between;
        margin: 8px;
        padding: 0px 32px 0px 32px;
        align-items: center;

    }

    .remove {
        cursor: pointer;
        margin-left: 8px;
        color: black;
        font-size: 16px;

    }

    .remove:hover {
        color: red;
    }

    .container {
        justify-content: center;
        align-content: center;
        width: 60%;
        align-items: center;

    }

    .todo-left {
        display: flex;
        align-items: center;
    }

    .todo-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;

    }

    .completed {
        text-decoration: line-through;
        color: grey
    }

    .extra {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 16px;
        margin-bottom: 16px;
        margin-left: 8px;
        padding-left: 8px;
        border-top: 1px solid grey
    }

    .buttons {
        display: flex;
        flex-flow: row nowrap;
        font-size: 12px;
    }

    .buttons button {
        margin: 2px;
        padding-right: 8px;
        width: 80px;
        border: 1px solid blue;
        box-shadow: #2c3e50;
    }

    .buttons button:hover {
        color: blue;
    }
</style>