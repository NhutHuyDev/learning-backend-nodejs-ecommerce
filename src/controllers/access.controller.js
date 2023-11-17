'use strict'

const AccessService = require("../services/access.service")
const { OkResponse, CreatedResponse } = require("../core/success.response")

class AccessController {
    login = async (req, res) => {
        new OkResponse(
            await AccessService.login(req.body)
        ).send(res)
    }

    signUp = async (req, res) => {
        new CreatedResponse(
            await AccessService.signUp(req.body)
        ).send(res)
    }

    logout = async (req, res) => {
        new OkResponse(
            await AccessService.logout(req.keyStore)
        ).send(res)
    }

    handleRefreshToken = async (req, res) => {
        new CreatedResponse(
            await AccessService.handleRefreshToken({
                refreshToken: req.refreshToken, 
                keyToken: req.keyStore,
                user: req.user
            })
        ).send(res)
    }
}

module.exports = new AccessController();