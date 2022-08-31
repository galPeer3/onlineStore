import Router from 'express';
const routes = new Router();
import productsRouter from './products.js' ;
import userRouter from './user.js';

routes.use('/user', userRouter);
routes.use('/products', productsRouter);

export default routes