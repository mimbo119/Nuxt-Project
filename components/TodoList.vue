<template>
    <v-layout row wrap>
        <input type="checkbox" v-model="completed" @click="click">
        <div class="todo-left">
            <div v-if="!editing" @dblclick="edit" class="todo-label" 
            :class="{ completed : completed}">
                {{title}}
            </div>
            <input v-else class="todo-edit" type="text" v-model="title" 
            v-on:keyup.enter="done" @blur="done" v-on:keyup.esc="cancel">
        </div>
        <div class="remove" @click="remove(index)">
            &times;
        </div>
    </v-layout>
</template>
<script>
    export default {
        name: "todo-list",
        props: {
            todo: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            checkAll : {
                type: Boolean,
                required: true,
            }
        },
        data (){
            return{
                'id': this.todo.id,
                'title': this.todo.title,
                'completed': this.todo.completed,
                'editing' : this.todo.editing,
                'before': '',
            }
        },
        watch:{
            checkAll(){
                if(this.checkAll){
                    this.completed = true
                } else {
                    this.completed = this.todo.completed
                }
            }
        },
        methods:{
            remove(index){
                this.$eventBus.$emit('remove', index)
            },
            edit(){
                this.before= this.title;
                this.editing=true;
            },
            click(){
                this.$store.dispatch('updateX', {
                    'id': this.id,
                    'title': this.title,
                    'completed': !this.completed,
                    'editing': this.editing,
                    
                });
            },
            done(){
                if (this.title.trim() == ''){
                    this.title=this.before
                }
                this.editing=false;
                this.$store.dispatch('updateX', {
                    'id': this.id,
                    'title': this.title,
                    'completed': this.completed,
                    'editing': this.editing,
                    
                });
                // this.$emit('finish', {
                //     'index': this.index,
                //     'todo': {
                //         'id': this.id,
                //         'title': this.title,
                //         'completed': this.completed,
                //         'editing': this.editing
                //     }
                // })
                
            },
            cancel(){
                this.title= this.before;
                this.editing= false;
                
            },
        }
    }
</script>