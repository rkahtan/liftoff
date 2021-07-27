const router = require('express').Router()
const { models: { Workout }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //get all workouts for a given user
    //eager load with included exercises' data
    //check for token
    res.json(users)
  } catch (err) {
    next(err)
  }
})

