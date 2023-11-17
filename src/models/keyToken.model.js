'use strict'

// !dmbgum 
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'KeyToken'
const COLLECTION_NAME = 'KeyTokens'

var keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },

    publicKey: {
        type: Schema.Types.String,
        require: true
    },

    refreshToken: {
        type: Schema.Types.String,
        require: true
    },

    refreshTokensUsed: {
        type: Schema.Types.Array,
        default: []
    }

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema)