'use strict'

const ProductService = require("../services/product.service")
const { OkResponse, CreatedResponse } = require("../core/success.response")

class ProductController {
    createProduct = async (req, res) => {
        new CreatedResponse(
            await ProductService.createProduct(req.body.product_type,
                {
                    ...req.body,
                    product_shop: req.user.userId
                }
            )
        ).send(res)
    }
}

module.exports = new ProductController()