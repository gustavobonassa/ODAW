const Product = require('../models/Product')

class ProductController {
    async index(req, res) {
        const filters = {}

        if (req.query.price_min || req.query.price_max) {
            filters.price = {}

            if (req.query.price_min) {
                filters.price.$gte = req.query.price_min;
            }
            if (req.query.price_max) {
                filters.price.$lte = req.query.price_max;
            }
        }
        if (req.query.title) {
            filters.title = new RegExp(req.query.title, 'i');
        }

        const ads = await Product.find()

        return res.json(ads);
    }

    async show(req, res) {
        const ad = await Product.findById(req.params.id)

        return res.json(ad);
    }

    async store(req, res) {
        const ad = await Product.create({
            ...req.body,
            author: req.userId
        })

        return res.json(ad);
    }

    async update(req, res) {
        const ad = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        return res.json(ad);
    }

    async destroy(req, res) {
        await Product.findByIdAndDelete(req.params.id)

        return res.send();
    }
}

module.exports = new ProductController();
