const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Product = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

Product.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', Product)
