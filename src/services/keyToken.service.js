'use strict'

const keyTokenModel = require("../models/keyToken.model")
const { Types } = require('mongoose')

class KeyTokenService {
    static saveKeyToken = async ({ userId, publicKey, refreshToken, refreshTokensUsed }) => {
        const filter = { user: userId }
        const update = {
            publicKey,
            refreshToken,
            refreshTokensUsed
        }
        const options = {
            upsert: true,
            new: true
        }

        const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options).lean()

        return tokens?.publicKey || null
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken }).lean()
    }

    static findByRefreshTokensUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }

    static removeById = async (_id) => {
        return await keyTokenModel.deleteOne({ _id }).lean()
    }

    static removeByUserId = async (userId) => {
        return await keyTokenModel.deleteOne({ user: userId }).lean()
    }

}

module.exports = KeyTokenService