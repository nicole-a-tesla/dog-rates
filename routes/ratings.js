const Rating = require('../models').Rating
const updateOrCreateRating = require('../models').updateOrCreateRating
const express  = require('express')
const router = express.Router()

router.post('/', (req,res) => {
  updateOrCreateRating(req.body.dogId, req.body.userId, req.body.score)
    .then((rating) => { res.json(rating) })
})

module.exports = router
