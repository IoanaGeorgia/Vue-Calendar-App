<template>
  <div class="calendarActivitiesWrapper">
    <p>Calendar Tasks </p>
    <div class="activitiesWrapper">
      <div class="activitiesTodoWrapper" v-for="(activity, index) in getStoreTodos" :key="index">
        <p class='activitiesTodoTitle'>{{activity.date}} <button @click="editTodo(activity, index)">Edit</button></p>
        <ul class="activitiesTodoList">
          <li v-for="todo in activity.todos"> {{ todo }}</li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script>
import store from '@/store'

export default {
  name: 'Activities',
  data(){
    return{
        days:[],
        month:"",
        year:"",

    }
  },
  computed:{

    getStoreTodos(){

      return JSON.parse(JSON.stringify(store.state.activities))
    }
  },


  methods:{
    editTodo(activity, index){
      let temp = {
        activity: activity,
        index:index
      }
      store.commit('EDIT_TODO', temp)

    },


  },

}
</script>

