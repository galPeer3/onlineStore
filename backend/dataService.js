'use strict'
const fs = require("fs");
const JSON5 = require("json5");
const path = require('path');
const {PRODUCTS_PATH,USERS_ACTIVITY,USERS_DETAILS,SHIPPING_DETAILS,PURCHASES_PATH, CARTS_PATH} = require("./utils/paths");


const getUserByEmail = async (email) => {
   const users = JSON5.parse(fs.readFileSync(USERS_DETAILS));
   const user = users.find((user) => user.email == email);
   return user;
}
const getUserActivities = async () => {
    const usersActivities = JSON5.parse(fs.readFileSync(path.join(__dirname, USERS_ACTIVITY)));
    return usersActivities;
}
const getUserCart = async (email) => {
    const carts = getAllCarts();
    return carts.find((cart) => cart["email"] == email);

}
const getAllCarts = async () => {
    const carts = JSON5.parse(fs.readFileSync(path.join(__dirname, CARTS_PATH)));
    return carts;
}
const getAllPurchases = async () => {
    const purchases = JSON5.parse(fs.readFileSync(PURCHASES_PATH));
    return purchases;
}
const getPurchaseById = async (orderNumber) => {
    const purchases = getAllPurchases();
    return purchases.find((purchase) => purchase["orderNumber"] == orderNumber);
}
const getAllUsersDetails = async () => {
    const users = JSON5.parse(fs.readFileSync(path.join(__dirname, USERS_DETAILS)));
    return users;
}

const getAllShippingDetails = async () =>{
    const shippingDetails = JSON5.parse(fs.readFileSync(SHIPPING_DETAILS));
    return shippingDetails;
}

const getAllProducts = async () => {
    const products = JSON5.parse(fs.readFileSync(path.join(__dirname, PRODUCTS_PATH)));
    return products;
}

const getProduct = async (id, categoryName) => {
    const products = await getAllProducts()
    const categoryIndex = products.findIndex((category) => category.name == categoryName);

    const productIndex = products[categoryIndex].products.findIndex((product) => product._id == id);

    return products[categoryIndex].products[productIndex];
}

const getHighestProductIdByCategory = async (categoryName) => {
    const products = JSON5.parse(fs.readFileSync(path.join(__dirname, PRODUCTS_PATH)));
    const category = products.find((category) => category.name == categoryName);
    if(!category) {
        return false;
    }
    const categoryProducts = category.products;

    const initialValue = 0;
    const maxId = categoryProducts.reduce(
            (maxId, product) => product["_id"] > maxId? product["_id"]: maxId,
            initialValue
            );

    return maxId;
}

const checkIfAdmin = async (email) => {
    const users = JSON5.parse(fs.readFileSync(USERS_DETAILS));
    const user = users.find((user) => user.email == email);

    return user["isAdmin"];
}




module.exports = {checkIfAdmin, getHighestProductIdByCategory, getProduct, getAllProducts,
    getAllUsersDetails, getPurchaseById, getAllPurchases, getAllCarts, getUserCart, getUserActivities,
    getUserByEmail, getAllShippingDetails};

