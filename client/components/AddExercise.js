import React from 'react';
import { connect } from 'react-redux';
import { addExerciseThunk } from '../store/exercises'

class AddExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      weight: '',
      sets: '',
      reps: '',
      notes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {token} = window.localStorage
    this.props.addExercise({ ...this.state }, token);
    this.setState({
      name: '',
      weight: '',
      sets: '',
      reps: '',
      notes: ''
    });
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
          <input type='text' name='weight' placeholder='Weight' onChange={handleChange} />
          <input type='text' name='sets' placeholder='Sets' onChange={handleChange} />
          <input type='text' name='reps' placeholder='Reps' onChange={handleChange} />
          <input type='textarea' name='notes' placeholder='Any Notes?' onChange={handleChange} />
          <button type='submit'>Add Exercise</button>
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

const mapDispatch = (dispatch, token) => {
  return {
    addExercise: (exercise, token) => dispatch(addExerciseThunk(exercise, token))
  }
}

export default connect(mapState, mapDispatch)(AddExercise)