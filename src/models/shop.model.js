'use strict'

// !dmbgum 
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

var shopSchema = new Schema({
    name: {
        type: Schema.Types.String,
        trim: true,
        maxSchema: 150,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        trim: true
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Schema.Types.Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, shopSchema)