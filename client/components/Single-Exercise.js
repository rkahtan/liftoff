import React from 'react';
import { connect } from 'react-redux';
import { fetchExercise } from '../store/single-exercise';
import UpdateExercise from './UpdateExercise';

class SingleExercise extends React.Component {
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
      this.props.fetchExercise(id, token);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.exercise === this.props.exercise) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    const { exercise } = this.props;
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

        {exercise && (
          <div>
            <h1>{exercise.name}</h1>
            {exercise.weight && <h2>Weight: {exercise.weight}</h2>}
            {exercise.sets && <h2>Sets: {exercise.sets}</h2>}
            {exercise.reps && <h2>Reps: {exercise.reps}</h2>}
            {exercise.notes && <h2>Notes: {exercise.notes}</h2>}
          </div>
        )}
        <div>
          <h1>Update This Exercise:</h1>
          <UpdateExercise id={this.props.match.params.id} history={this.props.history}/>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    exercise: state.single_exercise,
  };
};


const mapDispatch = (dispatch) => {
  return {
    fetchExercise: (id, token) => dispatch(fetchExercise(id, token)),
  };
};

export default connect(mapState, mapDispatch)(SingleExercise);
