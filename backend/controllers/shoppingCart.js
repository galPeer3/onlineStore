const JSON5 = require("json5");
const jwt = require('jsonwebtoken');
const {getUserCart, getUserByEmail, getAllProducts} = require ("../data-service/dataService.js");
const {insertProductToUserCart, deleteProductFromUserCart} = require("../persist.js") ;

 async function getUserShoppingCart(req, user, next){
        const {email} = user;

        const userCart = await getUserCart(email) || [];

        return userCart; 
    }

async function removeProductFromCart(req, user, next) {
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