import axios from 'axios'

const SET_WORKOUT = 'SET_WORKOUT'
//sets individual workout
const UPDATE_WORKOUT = 'UPDATE_WORKOUT'
const DELETE_SINGLE_WORKOUT = 'DELETE_SINGLE_WORKOUT'

const getWorkout = (workout) => ({
  action: SET_WORKOUT,
  workout
})

const updateWorkout = (workout) => ({
  action: UPDATE_WORKOUT,
  workout
})

const deleteSingleWorkout = (workout) => ({
  action: DELETE_SINGLE_WORKOUT,
  workout
})

export const fetchWorkout = () => {}
export const updateWorkoutThunk = () => {}
export const deleteSingleWorkoutThunk = () => {}
//in single view, deleting should reroute to all workouts

const initialState = {}

export default function singleWorkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WORKOUT:
      return action.workout;
    case UPDATE_WORKOUT:
      return action.workout;
    case DELETE_SINGLE_WORKOUT:
      return initialState;
    default:
      return state;
  }
}