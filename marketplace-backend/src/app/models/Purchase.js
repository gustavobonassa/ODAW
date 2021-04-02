const mongoose = require('mongoose')

const Purchase = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    neighborhood: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
    products: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Purchase', Purchase)
