import {getAllProducts}  from "../data-service/dataService.js";


    export async function getCategoriesData(req, res, next) {
        await getAllProducts();
    }

    export async function getSoccerData(req, res, next) {
       return await getAllProducts()[1].products;
    }

    export async function getBasketballData(req, res, next) {
        return await getAllProducts()[0].products;
    }

    export async function getWaterSportData(req, res, next) {
        return await getAllProducts()[2].products;
    }

    export async function getFitnessData(req, res, next) {
        return await getAllProducts()[1].products;
    }

    export async function getCyclingData(req, res, next) {
        return await getAllProducts()[1].products;
    }

    export async function getMartialArtsData(req, res, next) {
        return await getAllProducts()[1].products;
    }


