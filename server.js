const express  = require('express')
const app = express()
const fetch = require('node-fetch')
const cors  = require('cors')
const knexConfig = require('./knexfile')
const knex = require('knex') (knexConfig);
const bookshelf = require('bookshelf')(knex);
const bodyParser = require('body-parser')

const dogs = require('./routes/dogs')
const ratings = require('./routes/ratings')

app.use(cors())
app.use(bodyParser.json())
app.use('/dogs', dogs)
app.use('/ratings', ratings)

app.listen(3001, ()=> console.log('Example app listening on port 3001!'))
