import {createStore} from 'vuex'


const store = createStore({
    state:{
        clickedDate:'',
        activityToEdit:{
            val:"",
            index:"",
        },
        activities:[
            {date: '24 May 2024',
            todos:['clean cat', 'hug cat', 'kill cat']

            }
        ]
    },
    getters:{

    },
    mutations:{
        ADD_ACTIVITY(state, activity){
            state.activities.push(activity)
        },
        ADD_CLICKED_DATE(state, date){
            state.clickedDate = date
        },
        EDIT_TODO(state, temp){
             state.activityToEdit.val= temp.activity
             state.activityToEdit.index = temp.index
            },

        UPDATE_ACTIVITY(state, temp){
            state.activities[temp.index] = temp.activity
        }    
    },
    actions:{

    }
});
export default store