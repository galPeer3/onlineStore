import Router from 'express';
const productsRouter = new Router()
import {getCategoriesData, getSoccerData, getBasketballData, getWaterSportData,
    getFitnessData, getCyclingData, getMartialArtsData} from '../controllers/products.js';
// const authMiddleware = require('../middleware/authMiddleware')

productsRouter.get('/', getCategoriesData)
productsRouter.get('/soccer', getSoccerData)
productsRouter.get('/basketball', getBasketballData)
productsRouter.get('/watersport', getWaterSportData)
productsRouter.get('/fitness', getFitnessData)
productsRouter.get('/cycling', getCyclingData)
productsRouter.get('/martialArts', getMartialArtsData)



// router.get('/auth', authMiddleware, user.js.check)

export default productsRouter;
