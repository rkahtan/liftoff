import axios from 'axios'

const SET_WORKOUT = 'SET_WORKOUT'
//sets individual workout
const UPDATE_WORKOUT = 'UPDATE_WORKOUT'
const DELETE_SINGLE_WORKOUT = 'DELETE_SINGLE_WORKOUT'

const setWorkout = (workout) => ({
  type: SET_WORKOUT,
  workout
})

const updateWorkout = (workout) => ({
  type: UPDATE_WORKOUT,
  workout
})

const deleteSingleWorkout = () => ({
  type: DELETE_SINGLE_WORKOUT
})


export const fetchWorkout = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/workouts/${id}`)
      dispatch(setWorkout(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const updateWorkoutThunk = (workout) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/workouts/${workout.id}`, workout);
      dispatch(updateWorkout(updated));
    } catch (e) {
      console.log(e);
    }
  };
}
//needs to be able to add/remove exercises to workout
//as well as just updating the workout data itself
//write another thunk probably that will also go into put route for /workouts/:id

export const deleteSingleWorkoutThunk = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/workouts/${id}`);
      dispatch(deleteWorkout())
      history.push('/workouts')
    } catch (e) {
      console.log(e);
    }
  };
}
//in single view, deleting should reroute to all workouts
//assuming then the component will re-render without the deleted exercise, otherwise we will need
//a delete thunk for the all exercises reducer as well that filters out this one (will need to return something from thunk then in order to filter)

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