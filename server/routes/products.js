const Router = require('express')
const router = new Router()
const productsController = require('../controllers/products')
// const authMiddleware = require('../middleware/authMiddleware')

router.get('/home', productsController.getCategoriesData)
router.get('/home/soccer', productsController.getSoccerData)
router.get('/home/basketball', productsController.getBasketballData)
router.get('/home/watersport', productsController.getWaterSportData)
router.get('/home/fitness', productsController.getFitnessData)
router.get('/home/cycling', productsController.getCyclingData)
router.get('/home/martialarts', productsController.getMartialArtsData)



// router.get('/auth', authMiddleware, user.js.check)

module.exports = router