const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const { checkOverloadConnection } = require('./helpers/db.connection.helper')

require('dotenv').config()

const app = express()

// middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// db
require('./dbs/init.mongodb')
checkOverloadConnection()

// routes
app.use('/', require('./routes'))

// 404 handling
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.code = 404 
    error.status = 'error'
    next(error)
}) 

// error handling 
app.use((error, req, res, next) => {
    console.log(error.stack);
    status = error.code >= 400 && error.code < 500 ? 'error': 'fail'
    return res.status(error.code || 500).json({
        code: error.code || 500,
        status: status,
        message: error.message || 'Internal server error'
    })
}) 


module.exports = app