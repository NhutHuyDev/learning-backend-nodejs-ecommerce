'use strict'

const JWT = require('jsonwebtoken')
const crypto = require('crypto')
const { UnauthorizedError } = require('../core/error.response')

const createTokenPair = async (payload, privateKey) => {
    const { userId, email, dateTime } = payload

    const accessToken = JWT.sign(
        { userId, email, dateTime },
        privateKey,
        {
            algorithm: 'RS256',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
    )

    const refreshToken = JWT.sign(
        { userId, email },
        privateKey,
        {
            algorithm: 'RS256',
            expiresIn: process.env.REFESH_TOKEN_EXPIRATION
        }
    )

    return {
        accessToken,
        refreshToken
    }
}

const createRsaKeyPair = () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    return {
        publicKey,
        privateKey
    }
}

const verifyJWT = (token, verifyKey) => {
    try {
        return JWT.verify(token, verifyKey)
    } catch (error) {
        throw new UnauthorizedError(error.message)
    }
}

module.exports = {
    createTokenPair,
    createRsaKeyPair,
    verifyJWT
}