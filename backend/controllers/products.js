const {getAllProducts}  = require("../data-service/dataService.js");


     async function getCategoriesData(req, res, next) {
        await getAllProducts();
    }

     async function getSoccerData(req, res, next) {
       const products = await getAllProducts();
       res.status(200).send(products[1].products);
    }

     async function getBasketballData(req, res, next) {
        return await getAllProducts()[0].products;
    }

     async function getWaterSportData(req, res, next) {
        return await getAllProducts()[2].products;
    }

     async function getFitnessData(req, res, next) {
        return await getAllProducts()[1].products;
    }

     async function getCyclingData(req, res, next) {
        return await getAllProducts()[1].products;
    }

     async function getMartialArtsData(req, res, next) {
        return await getAllProducts()[1].products;
    }


module.exports = {getCategoriesData, getMartialArtsData, getCyclingData, getFitnessData, getWaterSportData,
    getBasketballData, getSoccerData};