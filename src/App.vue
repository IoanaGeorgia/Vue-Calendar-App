<template>
  <div class="mainWrapper">
    <div class="calendarBgWrapper">
    </div>



    <AddTodo />
    <Calendar />
    <Activities />

  </div>

</template>

<script>
import Calendar from './components/Calendar.vue';
import Activities from './components/Activities.vue';
import AddTodo from './components/AddTodo.vue'
import  './styles.css'

export default {
  name: 'App',
  components: {
    Calendar, Activities, AddTodo
  }
}
</script>

<style>

</style>
