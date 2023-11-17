'use strict'

const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: { type: Schema.Types.String, required: true },
    product_thumb: { type: Schema.Types.String, required: true },
    product_description: { type: Schema.Types.String },
    product_price: { type: Schema.Types.Number, required: true },
    product_quantity: { type: Schema.Types.Number, required: true },
    product_type: { type: Schema.Types.String, required: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, required: true }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

const clothingSchema = new Schema({
    brand: { type: Schema.Types.String, required: true },
    size: { type: Schema.Types.String },
    material: { type: Schema.Types.String }
}, {
    collection: 'Clothes',
    timestamps: true
})

const electronicsSchema = new Schema({
    manufacturer: { type: Schema.Types.String, required: true },
    model: { type: Schema.Types.String },
    color: { type: Schema.Types.String }
}, {
    collection: 'Electronics',
    timestamps: true
})

const furnitureSchema = new Schema({
    manufacturer: { type: Schema.Types.String, required: true },
    model: { type: Schema.Types.String },
    color: { type: Schema.Types.String }
}, {
    collection: 'Furniture',
    timestamps: true
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Electronic', electronicsSchema),
    clothing: model('Clothing', clothingSchema),
    furniture: model('Furniture', furnitureSchema)
}
