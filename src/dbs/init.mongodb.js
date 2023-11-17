'use strict'

const mongoose = require('mongoose')
const { countConnection } = require('../helpers/db.connection.helper')
const { mongo_db: { host, port, name } } = require('../configs')

const connectionStr = `mongodb://${host}:${port}/${name}`

class Database {
    constructor() {
        this.connect('mongodb', connectionStr)
    }

    connect(type = 'mongodb', connectionString) {
        if (!process.env.NODE_ENV) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectionString)
            .then(() => {
                console.log('Connected to MongoDB successfully')
                countConnection()
            })
            .catch(err => {
                console.log('Error connection')
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb