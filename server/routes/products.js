const Router = require('express')
const router = new Router()
const productsController = require('../controllers/products')
// const authMiddleware = require('../middleware/authMiddleware')

router.get('/', productsController.getCategoriesData)
router.get('/Soccer', productsController.getSoccerData)
router.get('/basketball', productsController.getBasketballData)
router.get('/watersport', productsController.getWaterSportData)
router.get('/fitness', productsController.getFitnessData)
router.get('/cycling', productsController.getCyclingData)
router.get('/martialarts', productsController.getMartialArtsData)



// router.get('/auth', authMiddleware, user.js.check)

module.exports = router