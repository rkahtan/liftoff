import React from 'react';
import { connect } from 'react-redux';
import {fetchWorkout} from '../store/single-workout'
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
    if (prevProps.exercise === this.props.exercise) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    const { workout } = this.props;
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

        {workout && (
          <div>
            <h1>{workout.name}</h1>
            {workout.notes && <h2>Notes: {workout.notes}</h2>}
          </div>
        )}
        <div>
          <h1>Update This Workout:</h1>
          {/* <UpdateExercise id={this.props.match.params.id} history={this.props.history}/> */}
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
