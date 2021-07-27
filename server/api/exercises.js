const router = require('express').Router()
const { models: { Exercise }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //get all exercises for a given user
    //check for token
    res.json(users)
  } catch (err) {
    next(err)
  }
})

