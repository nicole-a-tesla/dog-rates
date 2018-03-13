const express  = require('express')
const app = express()
const fetch = require('node-fetch')
const cors  = require('cors')
const knexConfig = require('./knexfile')

const knex = require('knex') (knexConfig);

const bookshelf = require('bookshelf')(knex);

const Dog = bookshelf.Model.extend({
  tableName: 'dogs',
  ratings: function() {
    return this.hasMany(Rating)
  }
});

const Rating = bookshelf.Model.extend({
  tableName: 'rating'
});


app.use(cors())

app.get('/pupper/', (req,res) => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response)=> response.json())
      .then((responseJson) => { 
        findOrCreateDog(responseJson.message).then((resultDog) => {
          res.json(resultDog)
        })
 })
})

const findOrCreateDog = (imageUrl) => {
  return Dog.where('imageSource', imageUrl).fetch()
    .then((matchingDogs) => {
      if (matchingDogs === null) {
        const newDog = new Dog({
          imageSource: imageUrl 
        })
        return newDog.save()
          .then((saved) => {
            return saved.attributes
          })
      }
      else {
        return matchingDogs[0]
      }
    })
}

app.get('/top_pupper/', (req, res) => {
  res.send('1')
})

app.listen(3001, ()=> console.log('Example app listening on port 3000!'))
