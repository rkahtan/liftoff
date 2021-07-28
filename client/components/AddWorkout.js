import React from 'react';
import { connect } from 'react-redux';
import { addWorkoutThunk } from '../store/workouts'

class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {token} = window.localStorage
    this.props.addWorkout({ ...this.state }, token);
    this.setState({
      name: '',
      notes: ''
    });
    //doesn't re-set input fields WHY
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='Exercise Name' onChange={handleChange} />
          <input type='textarea' name='notes' placeholder='Any Notes?' onChange={handleChange} />
          <button type='submit'>Create Workout</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    exercises: state.exercises
  }
}

const mapDispatch = (dispatch) => {
  return {
    addWorkout: (workout, token) => dispatch(addWorkoutThunk(workout, token))
  }
}

export default connect(null, mapDispatch)(AddWorkout)