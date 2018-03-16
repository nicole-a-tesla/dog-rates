const express  = require('express')
const app = express()
const fetch = require('node-fetch')
const cors  = require('cors')
const knexConfig = require('./knexfile')
const knex = require('knex') (knexConfig);
const bookshelf = require('bookshelf')(knex);

const dogs = require('./routes/dogs')
// const ratings = require('./routes/ratings')

app.use(cors())

app.use('/dogs', dogs)
// app.use('/ratings', ratings)

app.get('/top_pupper/', (req, res) => {
  res.send('1')
})

app.listen(3001, ()=> console.log('Example app listening on port 3000!'))
