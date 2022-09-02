const Router = require('express');
const userRouter = new Router();
const {register, logout, login, payment, shipping, purchaseCompleted, shoppingCart, addToCart, removeFromCart, checkout, addProduct, deleteProduct, userActivities} = require('../controllers/user.js');
// const authMiddleware = require('../middleware/authMiddleware')
const bodyParser = require('body-parser');

userRouter.use(bodyParser.json());

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/about', logout);
userRouter.get('/cart', shoppingCart);
userRouter.post('/addToCart', addToCart);
userRouter.post('/removeFromCart', removeFromCart);
userRouter.post('/checkout', checkout);
userRouter.post('/checkout/payment', payment);
userRouter.post('/checkout/shipping', shipping);
userRouter.get('/purchaseComplete', purchaseCompleted);
userRouter.post('/adminScreen/addProduct', addProduct);
userRouter.post('/adminScreen/removeProduct', deleteProduct);
userRouter.get('/adminScreen/userActivities', userActivities);

module.exports = userRouter;