import express from "express";

import Router from 'express';
const userRouter = new Router();
import {register, logout, login, shoppingCart, addToCart, removeFromCart, checkout, addProduct, deleteProduct, userActivities} from '../controllers/user.js';
// const authMiddleware = require('../middleware/authMiddleware')
userRouter.use(express.json());

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/cart', shoppingCart);
userRouter.post('/addToCart', addToCart);
userRouter.post('/removeFromCart', removeFromCart);
userRouter.post('/checkout', checkout);
userRouter.post('/adminScreen/addProduct', addProduct);
userRouter.post('/adminScreen/removeProduct', deleteProduct);
userRouter.get('/adminScreen/userActivities', userActivities);
//userRouter.get('/adminScreen', user.adminScreen);

// router.get('/auth', authMiddleware, user.check)


export default userRouter;
