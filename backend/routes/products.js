const Router = require('express');
const productsRouter = new Router()
const {getCategoriesData, getSoccerData, getBasketballData, getWaterSportData,
    getFitnessData, getCyclingData, getMartialArtsData} = require('../controllers/products');
// const authMiddleware = require('../middleware/authMiddleware')

productsRouter.get('/', getCategoriesData)
productsRouter.get('/soccer', getSoccerData)
productsRouter.get('/basketball', getBasketballData)
productsRouter.get('/watersport', getWaterSportData)
productsRouter.get('/fitness', getFitnessData)
productsRouter.get('/cycling', getCyclingData)
productsRouter.get('/martialArts', getMartialArtsData)



// router.get('/auth', authMiddleware, user.js.check)

module.exports = productsRouter;