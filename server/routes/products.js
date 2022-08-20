const Router = require('express')
const router = new Router()
const productsController = require('../controllers/products')
// const authMiddleware = require('../middleware/authMiddleware')

router.get('/register', productsController)


// router.get('/auth', authMiddleware, user.js.check)

module.exports = router