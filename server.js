const express  = require('express')
const app = express()
const fetch = require('node-fetch')
const cors  = require('cors')

app.use(cors())

app.get('/pupper/', (req,res)=>{
fetch('https://dog.ceo/api/breeds/image/random').then((r)=> r.json()).then((r)=>{ 
    console.log(r)
    res.send(r)
   })
})

app.listen(3001, ()=> console.log('Example app listening on port 3000!'))
