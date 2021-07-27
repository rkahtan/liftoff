import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercises, addExerciseThunk } from '../store/exercises'

class Exercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
    this.addHandler = this.addHandler.bind(this)
  }
  componentDidMount() {
    try {
      //passing token to thunk
      const {token} = window.localStorage
      this.props.fetchExercises(token);
      this.setState({ loading: false }); //this may need to go in did update instead?
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  addHandler() {}
  render() {
    return (
      <div>
        <h1>HELLO ARE YOU THERE</h1>
        {this.state.error && (
          <h1 className='error'>Error: {this.state.error}</h1>
        )}
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    exercises: state.exercises
  }
}

const mapDispatch = (dispatch, token) => {
  return {
    fetchExercises: (token) => dispatch(fetchExercises(token)),
    addExercise: (exercise) => dispatch(addExerciseThunk(exercise))
  }
}

export default connect(mapState, mapDispatch)(Exercises)