import JSON5 from "json5";
import jwt from 'jsonwebtoken';
import {getUserCart, getUserByEmail, getAllProducts} from "../data-service/dataService.js";
import {insertProductToUserCart, deleteProductFromUserCart} from "../persist.js" ;
import {authenticateUser} from './user.js';

export async function getUserShoppingCart(req, res, next){
        const user = await authenticateUser(req, next);
        const {email} = user;

        const userCart = getUserCart(email) || [];

        return userCart; 
    }

    export async function removeProductFromCart(req, res, next) {
        const user = await authenticateUser(req, next);
        const {email} = user;
        const productToAdd = req.body;
        const {productId} = productToAdd;

        deleteProductFromUserCart(email, productId);
    }

   export async function addProductToCart(req, res, next) {
        const user = await authenticateUser(req, next);
        const {email} = user;
        const productToAdd = req.body;
        const {productId} = productToAdd;

        insertProductToUserCart(email, productId);
        
     }


