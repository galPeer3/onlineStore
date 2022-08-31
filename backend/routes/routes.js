const Router = require('express');
const routes = new Router();
const productsRouter = require('./products') ;
const userRouter = require('./user');

routes.use('/user', userRouter);
routes.use('/products', productsRouter);

module.exports = routes;