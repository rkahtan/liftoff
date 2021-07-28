import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchWorkouts} from '../store/workouts'
import AddWorkout from './AddWorkout';
//import thunks and kid compos (add workout)
//this comp will link to single workout, whose child will be update workout

class Workouts extends React.Component {
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
      this.props.fetchWorkouts(token);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.workouts === this.props.workouts) {
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

        {this.props.workouts.map((workout) => {
          return (
            <div key={workout.id}>
              <Link to={`/workouts/${workout.id}`}>
                <h1>{workout.name}</h1>
                {workout.notes && <h2>Notes: {workout.notes}</h2>}
              </Link>
            </div>
          );
        })}
        <div>
          <h1>Add A Workout:</h1>
          <AddWorkout />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    workouts: state.workouts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchWorkouts: (token) => dispatch(fetchWorkouts(token)),
  };
};

export default connect(mapState, mapDispatch)(Workouts);
