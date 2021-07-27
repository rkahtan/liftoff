const router = require('express').Router()
const { models: { Workout }} = require('../db')
module.exports = router

 //ALWAYS CHECK FOR TOKEN

router.get('/', async (req, res, next) => {
  try {
    //get all workouts for a given user
    //eager load with included exercises' data
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //add a workout to the db AND ASSOCIATE IT TO USER
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    //get a single workout (single workout page)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    //update associated exercises, notes for single workout
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    //delete workout
    //re-route to all workouts page
  } catch (err) {
    next(err)
  }
})






