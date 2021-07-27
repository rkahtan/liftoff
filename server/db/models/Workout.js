const Sequelize = require('sequelize')
const db = require('../db')

const Workout = db.define('workout', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

module.exports = Workout

