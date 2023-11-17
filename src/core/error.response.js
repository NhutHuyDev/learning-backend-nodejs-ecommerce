'use strict'
const { STATUS_CODE, DEFAULT_STATUS_CODE_MESSAGE } = require('../utils/httpStatus')

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.code = statusCode
    }
}

// Bad Request
class BadRequestError extends ErrorResponse {
    constructor(message = DEFAULT_STATUS_CODE_MESSAGE.BAD_REQUEST,
        statusCode = STATUS_CODE.BAD_REQUEST) {
        super(message, statusCode)
    }
}

// Conflict
class ConflictError extends ErrorResponse {
    constructor(message = DEFAULT_STATUS_CODE_MESSAGE.CONFLICT,
        statusCode = STATUS_CODE.CONFLICT) {
        super(message, statusCode)
    }
}

// Unauthorized
class UnauthorizedError extends ErrorResponse {
    constructor(message = DEFAULT_STATUS_CODE_MESSAGE.UNAUTHORIZED,
        statusCode = STATUS_CODE.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

// Forbidden
class ForbiddenError extends ErrorResponse {
    constructor(message = DEFAULT_STATUS_CODE_MESSAGE.FORBIDDEN,
        statusCode = STATUS_CODE.FORBIDDEN) {
        super(message, statusCode)
    }
}

// Internal server error 
class InternalServerError extends ErrorResponse {
    constructor(message = DEFAULT_STATUS_CODE_MESSAGE.INTERNAL_SERVER,
        statusCode = STATUS_CODE.INTERNAL_SERVER) {
        super(message, statusCode)
    }
}

// Internal server error 
class NotFoundError extends ErrorResponse {
    constructor(message = DEFAULT_STATUS_CODE_MESSAGE.NOT_FOUND,
        statusCode = STATUS_CODE.NOT_FOUND) {
        super(message, statusCode)
    }
}

module.exports = {
    BadRequestError,
    ConflictError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
    NotFoundError
}

