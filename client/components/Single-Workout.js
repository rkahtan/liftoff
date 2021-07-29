import React from 'react';
import { connect } from 'react-redux';
import {fetchWorkout} from '../store/single-workout'
import { Link } from 'react-router-dom';
//import update workout component - in this you can add exercise associations


class SingleWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
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
  render() {
    const { workout } = this.props;
    const {error, loading} = this.state
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
            </div>
          );
        })}
        <div>
          <h1>Update This Workout:</h1>
          {/* <UpdateExercise id={this.props.match.params.id} history={this.props.history}/> */}
          {/* update workout/associate exercises component */}
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
  };
};

export default connect(mapState, mapDispatch)(SingleWorkout);
