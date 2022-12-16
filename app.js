// dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// create the app & set it to parse JSON
const app = express()
app.use(bodyParser.json())

// use dotenv if in not in production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// db conn
mongoose.connect(process.env.DATABASE_URL, {
}).then((res) => {
    console.log('Connected')
}).catch((err) => {
    console.log(`Connection Error: ${err}`)
})

// enable CORS BEFORE the controller declaration
const cors = require('cors')
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}))

// map url path to controller
const employers = require('./controllers/employers')
app.use('/api/employers', employers)

// start express web server & make public
app.listen(3000)
module.exports = app