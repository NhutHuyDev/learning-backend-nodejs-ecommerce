'use strict'

// !dmbgum 
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

var ApiKeySchema = new Schema({
    key: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },

    status: {
        type: Schema.Types.Boolean,
        default: true
    },

    permissions: {
        type: [Schema.Types.String],
        required: true,
        enum: ['0000', '1111', '2222']
    }

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ApiKeySchema)