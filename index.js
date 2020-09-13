const express = require('express')
const app = express()
require('./database/mongoose')

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)