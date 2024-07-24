<template>


  <div class="addTodoWrapper">
    <button class="openTodo" @click="openTaskMenu()">
    <span class="openTodoSpan">  {{ isMenuOpen|| getStoreEditTodo ? '-' : "+" }}</span>
    </button>

    <transition name='todo' v-show="isMenuOpen">
      <div class="openMenuWrapper" v-if="!getStoreEditTodo">


        <p>Date: <span>{{ chosenDate }}</span>
        </p>

        <input placeholder="Enter to do..." v-model=todo @keyup.enter="enterTodo()" />

        <ul class="todosWrapper">
          <li v-for="(todo, index) in todos" :key="index"> - {{ todo }}
            <button @click="deleteTodo(index)">+</button>
          </li>
        </ul>


        <p>
          <button class="saveSettings" @click=saveSettings()>
          <span class="saveSettingsSpan">Save</span>
        </button>
      </p>

      </div>



      <div class="openMenuWrapper" v-else>
        <p>Date:  <span>{{ actionInEdit.date }}</span>
        </p>
        <input placeholder="Enter to do..." v-model='editTodoInput' @keyup.enter="enterTodo()" />

        <ul class="todosWrapper">
          <li v-for="(todo, index) in actionInEdit.todos" :key="index"> - {{ todo }}
            <button @click="deleteTodo(index)">+</button>
          </li>
        </ul>


        <p><button class="saveSettings" @click=saveSettings()>Save</button></p>


      </div>

    </transition>
  </div>

</template>

<script>
import store from '@/store'

export default {
  name: 'AddTodo',
  data(){
    return{
      isMenuOpen: false,
      todos:[],
      todo:'',
      editTodo:'',
      editTodoInput:'',
      actionInEdit: {},
      allMonths: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]
    
  }
},
  computed:{
    chosenDate(){
      if(this.getStoreDate){
        return this.getStoreDate
      } else{
        return this.defaultDate
      }
    },
    defaultDate(){
      let date = new Date()
      let computedDate = date.getDate() + " "+ this.allMonths[date.getMonth()] + ' ' + date.getFullYear()
      return computedDate
    },
    getStoreDate(){
      return store.state.clickedDate
    },
    getStoreEditTodo(){
      if(store.state.activityToEdit.val){
        this.editTodo = JSON.parse(JSON.stringify(store.state.activityToEdit.val))
  
      }
      return this.editTodo
    }
  },


  methods:{
    saveSettings(){


      let todo;

      if (Object.values(this.getStoreEditTodo).length !== 0){
        todo = {
          date: this.actionInEdit.date,
          todos: [...this.actionInEdit.todos]
        }
      }else{
        todo = {
          date: this.chosenDate,
          todos: [...this.todos]
        }
      }


      let temporary;
      let editActivityIndex;

      if (Object.values(this.getStoreEditTodo).length !== 0) {

        if (Object.values(store.state.activities.filter((elem) => elem.date === this.editTodo.date)).length > 0) {

          editActivityIndex = store.state.activities.map(e => e.date).indexOf(this.editTodo.date);

          temporary = {
            index: editActivityIndex,
            activity: todo
          }

          if (Object.keys(temporary).length !== 0) {
            store.commit('UPDATE_ACTIVITY', temporary)
          }

        }


        else {
          if (Object.keys(todo).length !== 0) {
            store.commit('ADD_ACTIVITY', todo)
          }
        }
      }


      else if(Object.values(this.getStoreEditTodo).length === 0){

        if (Object.values(store.state.activities.filter((elem) => elem.date === this.chosenDate)).length > 0) {

          editActivityIndex = store.state.activities.map(e => e.date).indexOf(this.chosenDate);

          temporary = {
            index: editActivityIndex,
            activity: todo
          }

        

      

      if (Object.keys(temporary).length !== 0) {
        store.commit('UPDATE_ACTIVITY', temporary)
      }

    }
    

      else{
        if (Object.keys(todo).length !== 0){
          store.commit('ADD_ACTIVITY', todo)
        }
      }
    }



    },
    deleteTodo(index){
      if(Object.values(this.actionInEdit).length !==0){
        this.actionInEdit.todos = this.actionInEdit.todos.slice(0, index).concat(this.actionInEdit.todos.slice(index + 1))

      }else{
      this.todos = this.todos.slice(0, index).concat(this.todos.slice(index+1))
      }
    },
    enterTodo(){

      if((this.editTodoInput) && !this.todo){
        this.actionInEdit.todos.push(this.editTodoInput)
       
      } 
      else 
      {
        if (this.todo){
          if(this.todo && this.editTodoInput){
            this.actionInEdit.todos.push(this.editTodoInput)
          }else{
            this.todos.push(this.todo)
          }
       
      }
    }
      console.log(this.todo, 'the todo', this.editTodoInput, 'the edit to do input')
    },
    openTaskMenu(){
      console.log(this.isMenuOpen, 'isMenuOpen')
      console.log(this.getStoreEditTodo, 'storetodo')


     

      console.log(this.isMenuOpen, 'isMenuOpen after')

      if(this.isMenuOpen === false){
        this.editTodo = ""
      } 
      else{
      if(this.getStoreEditTodo){
        store.commit('EDIT_TODO', '')
      } 
    }

      this.isMenuOpen = !this.isMenuOpen
      
    }
  },

   watch: {
    getStoreEditTodo: function(newVal, oldVal){
      this.isMenuOpen = true
      if(newVal.date !== oldVal.date){
        this.actionInEdit =  newVal
      }

  }
  } 

}
</script>

