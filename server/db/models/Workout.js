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
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = Workout

