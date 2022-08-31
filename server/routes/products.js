import Router from 'express';
const productsRouter = new Router()
import {getCategoriesData, getSoccerData, getBasketballData, getWaterSportData,
    getFitnessData, getCyclingData, getMartialArtsData} from '../controllers/products.js';
// const authMiddleware = require('../middleware/authMiddleware')

router.get('/', productsController.getCategoriesData)
router.get('/Soccer', productsController.getSoccerData)
router.get('/basketball', productsController.getBasketballData)
router.get('/watersport', productsController.getWaterSportData)
router.get('/fitness', productsController.getFitnessData)
router.get('/cycling', productsController.getCyclingData)
router.get('/martialarts', productsController.getMartialArtsData)



// router.get('/auth', authMiddleware, user.js.check)

export default productsRouter;
