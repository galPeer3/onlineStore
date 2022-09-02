const Router = require('express');
const routes = new Router();
const productsRouter = require('./products') ;
const userRouter = require('./user');
const aboutUsRouter = require('./aboutUs');
const readmeRouter = require('readme.html');

routes.use('/user', userRouter);
routes.use('/products', productsRouter);
routes.use('/aboutUs', aboutUsRouter);
routes.use('/readme.html', readmeRouter);


module.exports = routes;