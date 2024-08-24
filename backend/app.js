const express = require('express')
const app = express()
const errorMiddleware = require('./middlewares/error')

const products = require('./routes/product')

app.use(express.json())

app.use('/api/v1/',products)

app.use(errorMiddleware)

module.exports = app