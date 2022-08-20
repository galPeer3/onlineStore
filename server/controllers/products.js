import JSON5 from "json5";
import {getAllProducts} from "server/data-service/dataService.js";

class ProductsController {
    products = await getAllProducts();

    async getCategoriesData(req, res, next) {
        
    }

    async getSoccerData(req, res, next) {
       return this.products[0].products;
    }

    async getBasketballData(req, res, next) {
        return this.products[0].products;
    }

    async getWaterSportData(req, res, next) {
        return this.products[0].products;
    }

    async getFitnessData(req, res, next) {
        return this.products[2].products;
    }

    async getCyclingData(req, res, next) {
        return this.products[1].products;
    }

    async getMartialArtsData(req, res, next) {
        return this.products[0].products;
    }
}

module.exports = new ProductsController();