'use strict'

const { product, clothing, electronic, furniture } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')

class ProductFactory {
    // key - value (class ref)
    static productRegistry = {}

    static registerProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) 
            throw new BadRequestError(`invalid product type ${type}`)

        return new productClass(payload).createProduct()
    }
}

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_quantity, product_type, product_shop, product_attributes,
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct(product_id) {
        try {
            return await product.create({ ...this, _id: product_id })
        } catch (err) {
            throw new BadRequestError('create new product error')
        }
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })

        if (!newClothing)
            throw new BadRequestError('create new clothing error')

        return await super.createProduct(newClothing._id)
    }
}

class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })

        if (!newElectronic)
            throw new BadRequestError('create new electronic error')

        return await super.createProduct(newElectronic._id)
    }
}

class Furniture extends Product {
    async createProduct() {
        const newElectronic = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })

        if (!newElectronic)
            throw new BadRequestError('create new furniture error')

        return await super.createProduct(newElectronic._id)
    }
}

// register product 
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Electronics', Electronics)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory


