import axios from 'axios'

const SET_EXERCISE = 'SET_EXERCISE'
//sets individual exercise in store
const UPDATE_EXERCISE = 'UPDATE_EXERCISE'
const DELETE_SINGLE_EXERCISE = 'DELETE_SINGLE_EXERCISE'


const setExercise = (exercise) => ({
  type: SET_EXERCISE,
  exercise
})

const updateExercise = (exercise) => ({
  type: UPDATE_EXERCISE,
  exercise
})

const deleteSingleExercise = () => ({
  type: DELETE_SINGLE_EXERCISE
})

export const fetchExercise = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/exercises/${id}`)
      dispatch(setExercise(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateExerciseThunk = (exercise) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/exercises/${exercise.id}`, exercise);
      dispatch(updateExercise(updated));
    } catch (e) {
      console.log(e);
    }
  };
}
export const deleteSingleExerciseThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      dispatch(deleteProject())
    } catch (e) {
      console.log(e);
    }
  };
}
//in single view, deleting should reroute to all workouts
//assuming then the component will re-render without the deleted exercise, otherwise we will need
//a delete thunk for the all exercises reducer as well that filters out this one (will need to return something from thunk then in order to filter)

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