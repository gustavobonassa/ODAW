const express = require('express');
const validate = require('express-validation');
const handle = require('express-async-handler');

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/users', validate(validators.User), handle(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

routes.get('/products', handle(controllers.ProductController.index))
routes.get('/products/:id', handle(controllers.ProductController.show))

routes.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.store))

routes.use(authMiddleware) //a partir daqui precisa estar autenticado
/*
 * Ads
 */
routes.post('/products', validate(validators.Product), handle(controllers.ProductController.store))
routes.put('/products/:id', validate(validators.Product), handle(controllers.ProductController.update))
routes.delete('/products/:id', handle(controllers.ProductController.destroy))

/*
 * Purchases
 */
routes.get('/purchases', handle(controllers.PurchaseController.index))

module.exports = routes;
