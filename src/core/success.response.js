'use strict'
const { STATUS_CODE } = require('../utils/httpStatus')

class SuccessResponse {
    constructor(statusCode, metadata) {
        this.code = statusCode
        this.status = 'sucess'
        this.data = metadata
    }

    send(res) {
        return res.status(this.code)
            .json(this)
    }
}

// Ok
class OkResponse extends SuccessResponse {
    constructor(metadata) {
        super(STATUS_CODE.OK, metadata)
    }
}

// Created
class CreatedResponse extends SuccessResponse {
    constructor(metadata) {
        super(STATUS_CODE.CREATED, metadata)
    }
}

module.exports = {
    OkResponse,
    CreatedResponse,
}

