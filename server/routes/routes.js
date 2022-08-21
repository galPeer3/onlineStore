const Router = require('express');
const router = new Router();
const productsRouter = require('./products');
const userRouter = require('./user');
const adminRouter = require('./admin');

router.use('/user', userRouter);
router.use('/home', productsRouter);

module.exports = router