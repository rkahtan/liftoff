import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Exercises from './components/Exercises'
import SingleExercise from './components/Single-Exercise';
import Workouts from './components/Workouts';
import SingleWorkout from './components/Single-Workout';
// import UpdateWorkout from './components/UpdateWorkout';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/exercises" component={Exercises} />
            <Route path="/exercises/:id" component={SingleExercise} />
            <Route exact path="/workouts" component={Workouts} />
            <Route exact path="/workouts/:id" component={SingleWorkout} />
            {/* <Route path="/workouts/:id/update" component={UpdateWorkout} /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
