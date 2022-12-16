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

// set the static path to the public folder; direct all http requests to index.html
app.use(express.static(__dirname + '/public'))
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// start express web server & make public
const port = process.env.PORT || 3000
app.listen(port)
module.exports = app