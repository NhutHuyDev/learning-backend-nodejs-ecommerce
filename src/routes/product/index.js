'use strict'

const express = require('express')
const router = express.Router()

const asyncHandler = require('../../helpers/asyncHandler')
const productController = require('../../controllers/product.controller')
const { authentication } = require('../../auth/middleware')

router.use(authentication)

router.post('/', asyncHandler(productController.createProduct))

module.exports = router