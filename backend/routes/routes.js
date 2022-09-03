const Router = require('express');
const routes = new Router();
const productsRouter = require('./products') ;
const userRouter = require('./user');
const readme = require('readme.html');

routes.use('/user', userRouter);
routes.use('/products', productsRouter);
routes.use('/readme.html', readme);


module.exports = routes;