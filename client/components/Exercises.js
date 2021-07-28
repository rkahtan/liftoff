import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercises } from '../store/exercises';
import AddExercise from './AddExercise';

class Exercises extends React.Component {
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
      this.props.fetchExercises(token);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.exercises === this.props.exercises) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div>
        <div>
          {this.state.error && (
            <div>
              <h1>Error: {this.state.error}</h1>
            </div>
          )}
          {this.state.loading && (
            <div>
              <h1>Loading</h1>
            </div>
          )}
        </div>

        {this.props.exercises.map((exercise) => {
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
          <h1>Add An Exercise:</h1>
          <AddExercise />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    exercises: state.exercises,
  };
};

const mapDispatch = (dispatch, token) => {
  return {
    fetchExercises: (token) => dispatch(fetchExercises(token)),
  };
};

export default connect(mapState, mapDispatch)(Exercises);
