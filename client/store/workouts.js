import axios from 'axios'


const SET_WORKOUTS = 'SET_WORKOUTS'
//get/fetch all workouts for a user
const ADD_WORKOUT = 'ADD_WORKOUT'
//adds another workout to the list of workouts for a user

const getWorkouts = (workouts) => ({
  type: SET_WORKOUTS,
  workouts
})

const addWorkout = (workout) => {
  type: ADD_WORKOUT,
  workout
}
//this will either return the addded workout, in which case we either:
//in reducer, return [...state.workouts, workout]
//in thunk, add workout will return ALL workouts including the added one, in which case we need to update action creator to imply all workouts

export const fetchWorkouts = () => {}

export const addWorkoutThunk = () => {}


//thunks need to take in user's id from the token as well?


initialState = []

export default function workoutsReducer(state=initialState, action) {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.workouts
    case ADD_WORKOUT:
      return;
      //edit this
    default:
      return state

  }
}