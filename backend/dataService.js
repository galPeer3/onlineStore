'use strict'
const fs = require("fs");
const JSON5 = require("json5");
const {PRODUCTS_PATH,USERS_ACTIVITY,USERS_DETAILS,SHIPPING_DETAILS,PURCHASES_PATH, CARTS_PATH} = require("./utils/paths");


const getUserByEmail = async (email) => {
   const users = JSON5.parse(fs.readFileSync(USERS_DETAILS));
   const user = users.find((user) => user.email == email);
   return user;
}
const getUserActivities = async () => {
    const usersActivities = JSON5.parse(fs.readFileSync(USERS_ACTIVITY));
    return usersActivities;
}
const getUserCart = async (email) => {
    const carts = getAllCarts();
    return carts.find((cart) => cart["email"] == email);

}
const getAllCarts = async () => {
    const carts = JSON5.parse(fs.readFileSync(CARTS_PATH));
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
    const users = JSON5.parse(fs.readFileSync(USERS_DETAILS));
    return users;
}

const getAllShippingDetails = async () =>{
    const shippingDetails = JSON5.parse(fs.readFileSync(SHIPPING_DETAILS));
    return shippingDetails;
}

const getAllProducts = async () => {
    const products = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    return products;
}

const getProductById = async (id) => {
    const products = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    return products.find((product) => product["id"] == id);
}

const getHighestProductIdByCategory = async (categoryName) => {
    const products = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    const category = products.find((category) => category['name'] == categoryName);
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




module.exports = {checkIfAdmin, getHighestProductIdByCategory, getProductById, getAllProducts,
    getAllUsers: getAllUsersDetails, getPurchaseById, getAllPurchases, getAllCarts, getUserCart, getUserActivities,
    getUserByEmail, getAllShippingDetails};
