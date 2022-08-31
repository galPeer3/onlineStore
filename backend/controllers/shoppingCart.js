const JSON5 = require("json5");
const jwt = require('jsonwebtoken');
const {getUserCart, getUserByEmail, getAllProducts} = require ("../data-service/dataService.js");
const {insertProductToUserCart, deleteProductFromUserCart} = require("../persist.js") ;
const {authenticateUser} = require('./user');

 async function getUserShoppingCart(user){
        const {email} = user;

        const userCart = getUserCart(email) || [];

        return userCart; 
    }

async function removeProductFromCart(req, res, next) {
        const user = await authenticateUser(req, next);
        const {email} = user;
        const productToAdd = req.body;
        const {productId} = productToAdd;

        deleteProductFromUserCart(email, productId);
    }

async function addProductToCart(req, user) {
        const {email} = user;
        const {id} = req.body;
        insertProductToUserCart(email, id);
        
     }


module.exports = {addProductToCart, removeProductFromCart, getUserShoppingCart}