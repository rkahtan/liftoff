const router = require('express').Router()
const { models: { Exercise }} = require('../db')
module.exports = router

//req.user = user

//get all exercises for a given user
router.get('/', async (req, res, next) => {
  try {
    const {id} = req.user
    const exercises = await Exercise.findAll({
      where: {
        userId: id
      }
    })
    
    res.json(exercises)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //add an exercise to the db AND ASSOCIATE IT TO USER
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    //get a single exercise (single exercise page)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    //update sets/reps/notes for SINGLE EXERCISE
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    //delete exercise
    //re-route to all exercises page
  } catch (err) {
    next(err)
  }
})





