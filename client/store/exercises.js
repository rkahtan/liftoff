import axios from 'axios'

const SET_EXERCISES = 'SET_EXERCISES'
//get/fetch all exercises for a user
const ADD_EXERCISE = 'SET_EXERCISE'
//adds another exercise to the list of exercises for a user

const getExercises = (exercises) => ({
  type: SET_EXERCISES,
  exercises
})

const addExercise = (exercise) => {
  type: ADD_EXERCISE,
  exercise
}
//this will either return the addded exercise, in which case we either:
//in reducer, return [...state.exercises, exercise]
//in thunk, add exercise will return ALL exercises including the added one, in which case we need to update action creator to imply all exercises

export const fetchExercises = () => {}

export const addExerciseThunk = () => {}


//thunks need to take in user's id from the token as well?


initialState = []

export default function exercisessReducer(state=initialState, action) {
  switch (action.type) {
    case SET_EXERCISES:
      return action.exercises
    case ADD_EXERCISE:
      return;
      //edit this
    default:
      return state

  }
}