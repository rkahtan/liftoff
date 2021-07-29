import React from 'react';
import { connect } from 'react-redux';
import {fetchWorkout, dissociateExToWorkoutThunk} from '../store/single-workout'
import { Link } from 'react-router-dom';
import UpdateWorkout from './UpdateWorkout';

class SingleWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
    this.handleDissociate = this.handleDissociate.bind(this)
  }
  componentDidMount() {
    
    try {
      const { token } = window.localStorage;
      const { id } = this.props.match.params;
      this.props.fetchWorkout(id, token);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.workout === this.props.workout) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  handleDissociate(e) {
    const { token } = window.localStorage;
    const { id } = this.props.workout;
    this.props.dissociate('dissociate', id, e.target.value, token)
  }
  render() {
    const { workout } = this.props;
    const {error, loading} = this.state
    const {handleDissociate} = this
    return (
      <div>
        <div>
          {error && (
            <div>
              <h1>Error: {error}</h1>
            </div>
          )}
          {loading && (
            <div>
              <h1>Loading</h1>
            </div>
          )}
        </div>
        {!loading && (
          <div>
            <h1>{workout.name}</h1>
            {workout.notes && <h2>Notes: {workout.notes}</h2>}
          </div>
        )}

        {!loading && workout.exercises.map(exercise => {
          return (
            <div key={exercise.id}>
              <Link to={`/exercises/${exercise.id}`}>
                <h1>{exercise.name}</h1>
                {exercise.weight && <h2>Weight: {exercise.weight}</h2>}
                {exercise.sets && <h2>Sets: {exercise.sets}</h2>}
                {exercise.reps && <h2>Reps: {exercise.reps}</h2>}
                {exercise.notes && <h2>Notes: {exercise.notes}</h2>}
              </Link>
              <button type='button' value={exercise.id} onClick={handleDissociate}>Remove This Exercise From Workout</button>
              {/* button to remove exercise from workout */}
            </div>
          );
        })}
        <div>
          <h1>Update This Workout:</h1>
          <UpdateWorkout history={this.props.history} workout={workout}/>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    workout: state.single_workout,
  };
};


const mapDispatch = (dispatch) => {
  return {
    fetchWorkout: (id, token) => dispatch(fetchWorkout(id, token)),
    dissociate: (method, workoutId, exerciseId, token) => dispatch(dissociateExToWorkoutThunk(method, workoutId, exerciseId, token))
  };
};

export default connect(mapState, mapDispatch)(SingleWorkout);
