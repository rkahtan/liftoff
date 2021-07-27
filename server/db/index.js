const db = require('./db')

const User = require('./models/User')
const Exercise = require('./models/Exercise')
const Workout = require('./models/Workout')

User.hasMany(Workout)
Workout.belongsTo(User)

User.hasMany(Exercise)
Exercise.belongsTo(User)

Workout.belongsToMany(Exercise, {through: 'workout-exercises'})
Exercise.belongsToMany(Workout, {through: 'workout-exercises'})

module.exports = {
  db,
  models: {
    User,
    Exercise,
    Workout
  },
}
