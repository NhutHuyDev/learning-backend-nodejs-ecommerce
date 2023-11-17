'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const KeyTokenService = require('./keytoken.service')
const { getInfoData } = require('../utils')
const { createTokenPair, createRsaKeyPair} = require('../auth/authUtils')
const { BadRequestError, UnauthorizedError, InternalServerError, ForbiddenError, NotFoundError } = require('../core/error.response')
const ShopService = require('./shop.service')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITER: 'EDITER',
    ADMIN: 'ADMIN'
}

class AccessService {
    static login = async ({ email, password }) => {
        const currentShop = await ShopService.findByEmail({ email })
        if (!currentShop) {
            throw new UnauthorizedError('Email or password is not correct')
        }

        const matchPassword = await bcrypt.compare(password, currentShop.password)
        if (!matchPassword) {
            throw new UnauthorizedError('Email or password is not correct')
        }

        const { privateKey, publicKey } = createRsaKeyPair()

        const tokens = await createTokenPair({
            userId: currentShop._id,
            email,
            dateTime: Date.now() 
        }, privateKey)

        if (!tokens) {
            throw new InternalServerError('create tokens error')
        }

        await KeyTokenService.saveKeyToken({
            userId: currentShop._id,
            publicKey,
            refreshToken: tokens.refreshToken
        })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: currentShop }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {
        const emailExisted = await shopModel.findOne({ email }).lean()

        if (emailExisted) {
            throw new BadRequestError('Shop already registered')
        }

        const passwordHash = await bcrypt.hash(password, Number(process.env.PASSWORD_HASH_SALT))

        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            const { privateKey, publicKey } = createRsaKeyPair()

            const tokens = await createTokenPair({
                userId: newShop._id,
                email,
                dateTime: Date.now()
            }, privateKey)

            if (!tokens) {
                throw new InternalServerError('create tokens error')
            }

            await KeyTokenService.saveKeyToken({
                userId: newShop._id,
                publicKey,
                refreshToken: tokens.refreshToken
            })

            return {
                shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                tokens
            }
        }
    }

    static logout = async (keyStore) => {
        const delkey = await KeyTokenService.removeById(keyStore._id)
        return {
            delKeyToken: delkey
        }
    }

    static handleRefreshToken = async ({ refreshToken, keyToken, user }) => {
        const {userId, email} = user
        
        if (keyToken.refreshTokensUsed.includes(refreshToken)){
            await keyToken.removeByUserId(userId)
            throw new ForbiddenError('refresh token is used! please login again')
        }

        if (keyToken.refreshToken !== refreshToken){
            throw new ForbiddenError('refresh token is invalid')
        }

        const currentShop = await ShopService.findByEmail({ email })

        if (!currentShop) {
            throw new NotFoundError('somthing go wrong! please try to login again')
        }

        const { privateKey, publicKey } = createRsaKeyPair()

        const tokens = await createTokenPair({
            userId: currentShop._id,
            email,
            dateTime: Date.now()
        }, privateKey)

        if (!tokens) {
            throw new InternalServerError('create tokens error')
        }

        const refreshTokensUsed = keyToken.refreshTokensUsed
        refreshTokensUsed.push(refreshToken)

        await KeyTokenService.saveKeyToken({
            userId: currentShop._id,
            publicKey,
            refreshToken: tokens.refreshToken,
            refreshTokensUsed
        })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: currentShop }),
            tokens
        }
    }
}

module.exports = AccessService