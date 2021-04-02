const Joi = require('joi')

module.exports = {
    body: {
        title: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().required(9)
    }
}
