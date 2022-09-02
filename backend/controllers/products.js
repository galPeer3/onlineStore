const {getAllProducts}  = require("../data-service/dataService.js");


     async function getCategoriesData(req, res, next) {
        const categories = await getAllProducts();
        const initialValue = [];
    const products = categories.reduce(
            (products, category) => products.concat(category.products),
            initialValue
            );
       res.status(200).send(products);
    }

     async function getSoccerData(req, res, next) {
       const products = await getAllProducts();
       res.status(200).send(products[1].products);
    }

     async function getBasketballData(req, res, next) {
        const products = await getAllProducts();
       res.status(200).send(products[1].products);
    }

     async function getWaterSportData(req, res, next) {
        const products = await getAllProducts();
       res.status(200).send(products[1].products);
    }

     async function getFitnessData(req, res, next) {
        const products = await getAllProducts();
       res.status(200).send(products[1].products);
    }

     async function getCyclingData(req, res, next) {
        const products = await getAllProducts();
        res.status(200).send(products[1].products);
    }

     async function getMartialArtsData(req, res, next) {
        const products = await getAllProducts();
       res.status(200).send(products[1].products);
    }


module.exports = {getCategoriesData, getMartialArtsData, getCyclingData, getFitnessData, getWaterSportData,
    getBasketballData, getSoccerData};