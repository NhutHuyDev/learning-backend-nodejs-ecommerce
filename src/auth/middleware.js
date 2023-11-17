'use strict'

const { ForbiddenError, UnauthorizedError } = require('../core/error.response')
const ApiKeyService = require('../services/apiKey.service')
const asyncHandler = require('../helpers/asyncHandler')
const KeyTokenService = require('../services/keytoken.service')
const { verifyJWT } = require('./authUtils')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-refresh-token',
}

const apiKey = asyncHandler(async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString()

    if (!key) {
        throw new ForbiddenError('Missing API key')
    }

    const apiKey = await ApiKeyService.findById(key)
    if (!apiKey) {
        throw new ForbiddenError('API key is invalid')
    }

    req.apiKey = apiKey

    return next()
})

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) {
        throw new UnauthorizedError('Missing userId')
    }

    const keyToken = await KeyTokenService.findByUserId(userId)
    if (!keyToken) {
        throw new UnauthorizedError('Tokens do not exist! Please login again')
    }

    const refreshToken = req.headers[HEADER.REFRESHTOKEN]
    
    if (refreshToken) {
        const decodeRefreshToken = verifyJWT(refreshToken, keyToken.publicKey)
        if (userId == decodeRefreshToken.userId) {
            req.keyStore = keyToken 
            req.user = decodeRefreshToken 
            req.refreshToken = refreshToken 
            return next()
        }    
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION].split(' ')[1]
    if (!accessToken) {
        throw new UnauthorizedError('Missing access token')
    }

    const decodeToken = verifyJWT(accessToken, keyToken.publicKey)

    if (userId !== decodeToken.userId) {
        throw new ForbiddenError()
    }

    req.keyStore = keyToken 
    req.user =  decodeToken  
    req.refreshToken = refreshToken 
    next()

})

const permission = (permission) => {
    return (req, res, next) => {
        try {
            if (!req.apiKey.permissions) {
                throw new ForbiddenError('Permission denied')
            }

            const validPermission = req.apiKey.permissions.includes(permission)
            if (!validPermission) {
                throw new ForbiddenError('Permission denied')
            }

            return next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    apiKey,
    permission,
    authentication
}

