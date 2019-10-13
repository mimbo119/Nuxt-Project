export const state = () => ({
    filter: 'all',
    todos: [{
        
    }]
});

export const getters = {
    remaining(state){
        return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters){
        return getters.remaining != 0 ;
    },
    todoFilter(state){
        if(state.filter == 'all'){
            return state.todos;
        }
        else if(state.filter == 'active'){
            return state.todos.filter(todo => !todo.completed);
        }
        else if(state.filter == 'completed'){
            return state.todos.filter(todo => todo.completed);
        }
        return state.todos;
    },
    showClear(state){
        return state.todos.filter(todo => todo.completed).length > 0 ;
    }
};

export const mutations = {
    addTodo(state, todo){
        state.todos.push({
            id: todo.id,
            title: todo.title,
            completed: false,
            editing: false,

        })
    },
    clearX(state){ 
        // async getIP({ commit }){
        //     const response = await this.$axios.$get('http://127.0.0.1:8000/api/todos');
        //     //commit('SET_IP', ip);
        //     console.log(response);
        // };

        // this.$axios.$get('http://127.0.0.1:8000/api/todos')
        //     .then(response =>{
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        state.todos = state.todos.filter(todo => !todo.completed)
    },
    changeFilterX(state, payload){
        state.filter = payload;
    },
    checkAllX(state, checked){
        state.todos.forEach(element => {
            element.completed = checked;
        });
    },

    removeX(state, id){
        const index = state.todos.findIndex(item => item.id == id);
        state.todos.splice(index, 1);
    },

    updateX(state, payload){
        const index = state.todos.findIndex(item => item.id == this.id);
        state.todos.splice(index, 1 , {
            'id': payload.id,
            'title': payload.title,
            'completed': payload.completed,
            'editing': payload.editing,

        });
    },
    getFrom(state, dbtodo){
        state.todos = dbtodo;
    }
};

export const actions = {
    async getFrom(context){
        const dbtodo = await this.$axios.$get('http://127.0.0.1:8000/api/todos')
        //console.log(dbtodo);
        context.commit('getFrom', dbtodo);
                            
    },

    async addTodo(context, todo){
        
        const dbtodo = await this.$axios.$post('http://127.0.0.1:8000/api/todos' , {
            title : todo.title,
            completed : 0
        })
        //console.log(dbtodo);
        context.commit('addTodo', dbtodo);
        
    },
    clearX(context){
        //console.log(context.state.todos);
        const completed = context.state.todos.filter(todo => todo.completed).map(todo => todo.id)

        this.$axios.$delete('http://127.0.0.1:8000/api/todosDeleteCompleted' , completed);
        context.commit('clearX');
    },
    changeFilterX(context, payload){
        context.commit('changeFilterX', payload);
    },
    async checkAllX(context, checked){
        await this.$axios.$patch('http://127.0.0.1:8000/api/todosCheckAll', {
            completed : checked
        })
        context.commit('checkAllX', checked);
    },

    async removeX(context, index){
        await this.$axios.$delete('http://127.0.0.1:8000/api/todos/' + index)
        //console.log(dbtodo);
        //context.commit('getFrom', dbtodo);
        context.commit('removeX', index);

    },

    async updateX(context, todo){
        const dbtodo = await this.$axios.$patch('http://127.0.0.1:8000/api/todos/'+ todo.id , {
            title : todo.title,
            completed : todo.completed
        })
        //console.log(dbtodo);
        context.commit('updateX', dbtodo);
    },
};    