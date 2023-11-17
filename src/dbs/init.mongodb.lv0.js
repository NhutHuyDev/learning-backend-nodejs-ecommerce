'use strict'

const mongoose = require('mongoose')

const connectionStr = `mongodb+srv://
nguyennhuthuydev:7hRibupQcFiFlWIM
@be-architecture.pqh4rkd.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connectionStr)
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => {
        console.log(err.message)
        console.log('Error MongoDB Connection!')
    })


// dev 
if (1 === 1) {
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})
}

module.exports = mongoose

// -> Do require đã cached lại file trên môi trường Node
// -> Dễ bị import lại với các ngôn ngữ khác