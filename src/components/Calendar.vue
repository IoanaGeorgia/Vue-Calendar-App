<template>


  <div class="calendarWrapper">


    <div class="calendarMainWrapper">
      <div>
        <div>{{ currentShownMonth }} {{ year }}</div>
        <div class="calendarButtons">
          <button @click="updatePrevMonth()">
            <span class="material-icons-outlined">
              chevron_left
            </span>
          </button>
          <button @click="updateNextMonth()">
            <span class="material-icons-outlined">
              chevron_right
            </span></button>
        </div>
      </div>

      <div class="calendar">
        <ul>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fr</li>
          <li>Sat</li>
          <li>Sun</li>
        </ul>
        <div class="days" :key=componentKey>
          <button v-for="day in days" :class="day.class !== '' ? day.class : customClass(day.value)"
            @click="addClickedDate(day.value)"> {{ day.value }} </button>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
import store from '@/store'

export default {
  name: 'Calendar',
  data() {
    return {
      componentKey: 0,
      days: [],
      month: "",
      year: "",
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
  computed: {
    currentShownMonth() {
      return this.allMonths[this.month]
    },
    currentDate() {
      return new Date().getDate() + ' ' + this.currentShownMonth + ' ' + this.year

    },



  },


  methods: {

    addClickedDate(val) {
      let clickedDate = val + ' ' + this.currentShownMonth + ' ' + this.year

      let temp;
      let editActivityIndex;
      if (Object.values(store.state.activities.filter((elem) => elem.date === clickedDate)).length > 0) {

        editActivityIndex = store.state.activities.map(e => e.date).indexOf(clickedDate);
        temp = {
          activity: JSON.parse(JSON.stringify(store.state.activities[editActivityIndex])),
          index: editActivityIndex
        }

      }
      else {

        temp = {
          activity: {
            date: clickedDate,
            todos: []
          },
          index: ""
        }

      }

      store.commit('EDIT_TODO', temp)

    },
    customClass(day) {


      let fullDate = day + ' ' + this.currentShownMonth + ' ' + this.year

      if (Object.values(store.state.activities.filter((elem) => elem.date === fullDate)).length > 0) {
        let formattedFullDate;
        let currentMonthIndex = this.allMonths.indexOf(this.currentShownMonth) + 1
        let formattedCurrentDate = new Date()

        if (this.allMonths.indexOf(this.currentShownMonth).length > 9) {
          formattedFullDate = currentMonthIndex + '-' + day + '-' + this.year
        } else {
          formattedFullDate = '0' + currentMonthIndex + '-' + day + '-' + this.year

        }

        
        if (new Date(formattedFullDate) > formattedCurrentDate) {
        
          return 'selectedFutureDate'
        } else {
          
          return 'selectedPastDate'
        }
      }

    },
    getMonth() {
      let date = new Date()
      this.month = date.getMonth()
      this.year = date.getFullYear()
    },
    updatePrevMonth() {
      if (this.month <= 0) {
        this.month = 11
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      this.days = []
      this.getDays()
    },
    updateNextMonth() {
      if (this.month >= 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.days = []
      this.getDays()
    },

    getDays() {

      let month = this.month
      let year = this.year
      let dayone = new Date(year, month, 1).getDay();
      let lastdate = new Date(year, month + 1, 0).getDate();
      let dayend = new Date(year, month, lastdate).getDay() - 1;
      let monthlastdate = new Date(year, month, 0).getDate();

      if (dayone > 0) {
        for (let i = dayone - 1; i > 0; i--) {
          this.days.push({ value: monthlastdate - i + 1, class: 'obsolete' })
        }
      } else {
        for (let i = 6; i > 0; i--) {
          this.days.push({ value: monthlastdate - i + 1, class: 'obsolete' })
        }
      }

      for (let i = 1; i <= lastdate; i++) {
        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
          this.days.push({ value: i, class: 'today' })
        }

        else {
          this.days.push({ value: i, class: '' })
        }
      }

      for (let i = dayend; i < 6; i++) {
        this.days.push({ value: i - dayend + 1, class: 'obsolete' })
      }

    }

  },
  mounted() {
    this.getMonth()
    this.getDays()
  },



}
</script>
