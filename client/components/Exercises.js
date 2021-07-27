import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercises, addExerciseThunk } from '../store/exercises'
import { Card, Container, Row, Button } from 'react-bootstrap';

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
      this.props.fetchExercises();
      this.setState({ loading: false }); //this may need to go in did update instead?
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  addHandler() {}
  render() {
    return (
      <Container>
        <h1>HELLO ARE YOU THERE</h1>
        {this.state.error && (
          <Badge bg='secondary' className='center'>Error: {this.state.error}</Badge>
        )}
      </Container>
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
    fetchExercises: () => dispatch(fetchExercises()),
    addExercise: (exercise) => dispatch(addExerciseThunk(exercise))
  }
}

export default connect(mapState, mapDispatch)(Exercises)