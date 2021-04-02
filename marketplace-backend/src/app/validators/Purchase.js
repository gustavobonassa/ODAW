const Joi = require('joi')

module.exports = {
    body: {
        products: Joi.required(),
        name: Joi.string().required(),
    }
}
