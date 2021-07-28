import React from 'react';
import { connect } from 'react-redux';
import {
  updateExerciseThunk,
  deleteSingleExerciseThunk,
} from '../store/single-exercise';

class UpdateExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      weight: '',
      sets: '',
      reps: '',
      notes: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const {token} = window.localStorage
    const {id} = this.props
    this.props.updateExercise(id, {...this.state}, token)
    this.setState({
      name: '',
      weight: '',
      sets: '',
      reps: '',
      notes: '',
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleDelete() {
    const {token} = window.localStorage
    const {id, history} = this.props
    this.props.deleteExercise(id, token, history) 
  }
  render() {
    const { handleSubmit, handleChange, handleDelete } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name='name'
            value={this.state.name}
            placeholder='Exercise Name'
            onChange={handleChange}
          />
          <input
            name='weight'
            value={this.state.weight}
            placeholder='Weight'
            onChange={handleChange}
          />
          <input
            name='sets'
            value={this.state.sets}
            placeholder='Sets'
            onChange={handleChange}
          />
          <input
            name='reps'
            value={this.state.reps}
            placeholder='Reps'
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
        <button type='button' onClick={handleDelete}>Delete This Exercise</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateExercise: (id, exercise, token) => dispatch(updateExerciseThunk(id, exercise, token)),
    deleteExercise: (id, token, history) => dispatch(deleteSingleExerciseThunk(id, token, history)),
  };
};

export default connect(null, mapDispatch)(UpdateExercise);
