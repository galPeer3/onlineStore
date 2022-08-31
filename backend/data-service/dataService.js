const fs = require("fs"); 
const JSON5 = require("json5");
const path = require('path');

const getUserByEmail = async (email) => {
   const users = JSON5.parse(fs.readFileSync(path.join(__dirname, "../../backend/data/users.json")));
   const user = users.find((user) => user.email == email);
   return user;
}
const getUserActivities = async () => {
    const usersActivities = JSON5.parse(fs.readFileSync("/server/data/usersActivities.json"));
    return usersActivities;
}
const getUserCart = async (email) => {
    const carts = getAllCarts();
    return carts.find((cart) => cart["email"] == email);

}
const getAllCarts = async () => {
    const carts = JSON5.parse(fs.readFileSync(path.join(__dirname, "../../backend/data/carts.json")));
    return carts;
}
const getAllPurchases = async () => {
    const purchases = JSON5.parse(fs.readFileSync("/server/data/purchases.json"));
    return purchases;
}
const getPurchaseById = async (orderNumber) => {
    const purchases = getAllPurchases();
    return purchases.find((purchase) => purchase["orderNumber"] == orderNumber);
}
const getAllUsers = async () => {
    const users = JSON5.parse(fs.readFileSync("/server/data/users.json"));
    return users;
}
const getAllProducts = async () => {
    const products = JSON5.parse(fs.readFileSync(path.join(__dirname, "../../backend/data/products.json")));
   return products;
}

const getProductById = async (id) => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json"));
    return products.find((product) => product["id"] == id);
}

const getHighestProductIdByCategory = async (categoryName) => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json"));
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
    const users = JSON5.parse(fs.readFileSync(path.join(__dirname, "../../backend/data/users.json")));
    const user = users.find((user) => user.email == email);

    return user["isAdmin"];
}


module.exports = {checkIfAdmin, getHighestProductIdByCategory, getProductById, getAllProducts,
    getAllUsers, getPurchaseById, getAllPurchases, getAllCarts, getUserCart, getUserActivities,
    getUserByEmail};

