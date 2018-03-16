const Dog = require('../models').Dog
const fetch = require('node-fetch')
const findOrCreateDog = require('../models').findOrCreateDog
const express  = require('express')
const router = express.Router()

router.get('/', (req,res) => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response)=> response.json())
    .then((responseJson) => { 
      findOrCreateDog(responseJson.message).then((resultDog) => {
        res.json(resultDog)
      })
   })
})


module.exports = router
