const Purchase = require('../models/Purchase')
const Product = require('../models/Product')

class PurchaseController {
    async index(req, res) {
        const pur = await Purchase.find().lean();
        const products = await Product.find().lean();

        const purchases = pur.map((e) => {
            const prod = e.products.map((p) => {
                const findProd = products.find((v) => String(v._id) === p.id);

                return {
                    ...findProd,
                    ...p,
                }
            })

            return {
                ...e,
                products: prod,
            }
        })

        return res.json(purchases);
    }
    async store(req, res) {
        const {
            products,
        } = req.body

        for (const i of products) {
            const product = await Product.findById(i.id);

            product.amount = product.amount - i.amount;

            await Product.findByIdAndUpdate(i.id, product, {
                new: true
            });
        }
        req.body.user = JSON.stringify(req.body) + Math.random();

        const purch = await Purchase.create(req.body);

        return res.json(purch)
    }
}

module.exports = new PurchaseController()
