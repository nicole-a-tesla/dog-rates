const Rating = require('../models').Rating
const updateOrCreateRating = require('../models').updateOrCreateRating
const express  = require('express')
const router = express.Router()

router.post('/', (req,res) => {
  updateOrCreateRating(res.body.dogId, res.body.userId, res.body.score)
    .then((rating) => { res.json(rating) })
})

module.exports = router
