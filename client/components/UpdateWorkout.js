import React from 'react';
import { connect } from 'react-redux';
import {
  updateWorkoutThunk,
  deleteSingleWorkoutThunk,
  associateExToWorkoutThunk,
} from '../store/single-workout';
import { fetchExercises } from '../store/exercises';

//PROPS PASSED DOWN: WORKOUT, HISTORY

class UpdateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        notes: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAssociate = this.handleAssociate.bind(this)
  }
  componentDidMount() {
    //console.log(this.props) //fetching workout doesn't work because the id is undefined here
    try {
      const { token } = window.localStorage;
      this.props.fetchExercises(token);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }

  
  handleSubmit(e) {
    e.preventDefault();
    const { token } = window.localStorage;
    const { id } = this.props.workout;
    this.props.updateWorkout(id, { ...this.state}, token);
    //doesn't re-set state to empty strings
    this.setState({
      name: '',
      notes: '',
    });
  }
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }
  handleDelete() {
    const { token } = window.localStorage;
    const { id } = this.props.workout;
    const {history} = this.props
    this.props.deleteWorkout(id, history, token);
    history.push(`/workouts`) //doesn't reflect changes until you re-load page
    //re-loading page re-renders it so it re-fetches new info
    //is there a way to make sure all workouts page re-renders when you delete a workout (which is in update, in single)
    //doesn't re-render all workouts because update/single aren't its children?
  }
  handleAssociate(e) {
    const { token } = window.localStorage;
    const { id } = this.props.workout;
    const {history} = this.props
    this.props.associate('associate', id, e.target.value, token)
    history.push(`/workouts/${id}`)
  }
  render() {
    const { handleSubmit, handleChange, handleDelete, handleAssociate } = this;
    const { exercises } = this.props;
    return (
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name='name'
              value={this.state.name}
              placeholder='Exercise Name'
              onChange={handleChange}
            />
            <input
              name='notes'
              value={this.state.notes}
              placeholder='Any Notes?'
              onChange={handleChange}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div>
          <h2>Add Exercises:</h2>
          {exercises &&
            exercises
            // .filter(exercise => !workout.exercises.includes(exercise))
      

            .map((exercise) => {
              return (
                <div key={exercise.id}>
                  <h3>{exercise.name}</h3>
                  <button type='button' value={exercise.id} onClick={handleAssociate}>Add This Exercise</button>
                </div>
              );
            })}
        </div>

        <button type='button' onClick={handleDelete}>
          Delete This Workout
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    exercises: state.exercises
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateWorkout: (id, workout, token) =>
      dispatch(updateWorkoutThunk(id, workout, token)),
    deleteWorkout: (id, history, token) =>
      dispatch(deleteSingleWorkoutThunk(id, history, token)),
    fetchExercises: (token) => dispatch(fetchExercises(token)),
    associate: (method, workoutId, exerciseId, token) => dispatch(associateExToWorkoutThunk(method, workoutId, exerciseId, token)),
  };
};

export default connect(mapState, mapDispatch)(UpdateWorkout);
