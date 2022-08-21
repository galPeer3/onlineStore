const Router = require('express');
const router = new Router();
const user = require('../controllers/user');
const admin = require("../controllers/admin");
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/logout', user.logout);
router.get('/cart', user.shoppingCart);
router.post('/addToCart', user.addToCart);
router.post('/removeFromCart', user.removeFromCart);
router.post('/checkout', user.checkout);
router.post('/adminScreen/addProduct', user.addProduct);
router.get('/adminScreen/userActivities', user.userActivities);
router.get('/adminScreen', user.adminScreen);

// router.get('/auth', authMiddleware, user.check)


module.exports = router
