import axios from 'axios'

const SET_EXERCISE = 'SET_EXERCISE'
//sets individual exercise in store
const UPDATE_EXERCISE = 'UPDATE_EXERCISE'
const DELETE_SINGLE_EXERCISE = 'DELETE_SINGLE_EXERCISE'


const getExercise = (exercise) => ({
  action: SET_EXERCISE,
  exercise
})

const updateExercise = (exercise) => ({
  action: UPDATE_EXERCISE,
  exercise
})

const deleteSingleExercise = (exercise) => ({
  action: DELETE_SINGLE_EXERCISE,
  exercise
})

export const fetchExercise = () => {}
export const updateExerciseThunk = () => {}
export const deleteSingleExerciseThunk = () => {}
//in single view, deleting should reroute to all workouts

const initialState = {}

export default function singleExerciseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXERCISE:
      return action.exercise;
    case UPDATE_EXERCISE:
      return action.exercise;
    case DELETE_SINGLE_EXERCISE:
      return initialState;
    default:
      return state;
  }
}