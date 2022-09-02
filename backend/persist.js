'use strict'
const JSON5 = require("json5");
const fs  = require("fs");
const {getProductById, getAllUsersDetails, getAllProducts, getAllShippingDetails, getUserActivities, getHighestProductIdByCategory, getAllCarts, getUserCart, getAllPurchases} = require('./dataService.js');
const {PRODUCTS_PATH,USERS_ACTIVITY,USERS_DETAILS,SHIPPING_DETAILS,PURCHASES_PATH, CARTS_PATH} = require("./utils/paths");

// Data that must be persisted:
// User details - done
// Cart - done
// Purchases - done
// Login activity - done

async function insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription) {
    const storeProducts = await getAllProducts();
    const categoryIndex = storeProducts.findIndex((category) => category.name == productCategory);
    const highestId = await getHighestProductIdByCategory(productCategory);
    console.log(highestId)
    if(highestId == false) {
        return false;
    }

    let newProductRecord = {
        _id: highestId + 1,
        title: productTitle,
        category: productCategory,
        image: productImage,
        price: productPrice,
        description: productDescription};
    
    storeProducts[categoryIndex].products.push(newProductRecord);
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(storeProducts));

    return true;
}

async function removeProduct(productId, categoryName) {
    let storeProducts = await getAllProducts();
    const categoryIndex = storeProducts.findIndex((category) => category.name == categoryName);

    const afterDeletion = storeProducts[categoryIndex].products.filter((product)=> product._id != productId );
    storeProducts[categoryIndex].products = afterDeletion;
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(storeProducts));
}

function removeProductById(productId) {
    const storeProducts = getAllProducts();
    const categoryIndex = storeProducts.indexOf((category) => category['name'] == categoryName);
    storeProducts[categoryIndex].products.filter((product)=>product._id !== productId );
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(storeProducts));
}

function insertIntoUsersActivities(activity, email, message){ //login, logout, add-to-cart
    const usersActivities = getUserActivities();
    let newActivityRecord = {activity: activity,
                            date: new Date(),
                            email: email,
                            event: message};
    usersActivities.push(newActivityRecord);
    fs.writeFileSync(USERS_ACTIVITY, JSON5.stringify(usersActivities));
}

function insertIntoUsersDetails(email, hashPassword, isAdmin){
    const usersDetails = getAllUsersDetails();
    let newUserRecord = {email: email,
                        hashPassword: hashPassword,
                        isAdmin: isAdmin};
    usersDetails.push(newUserRecord);
    fs.writeFileSync(USERS_DETAILS, JSON5.stringify(usersDetails));
}

function addProductToUserCart(email, productId) {
    const allCarts = getAllCarts();
    const productToAdd = getProductById(productId);
    allCarts[email]["products"].push(productToAdd)
    fs.writeFileSync(CARTS_PATH, JSON5.stringify(allCarts));
}

function removeProductFromUserCart(email, productId) {
    const allCarts = getAllCarts();
    const userCart = getUserCart(email);
    if (userCart) delete userCart[productId];
    fs.writeFileSync(CARTS_PATH, JSON5.stringify(allCarts));
}

function insertPurchase(email, orderNumber, purchase) {
    const allPurchases = getAllPurchases();
    let newPurchaseRecord = {orderNumber: orderNumber,
                            summery: purchase};
    allPurchases[email].push(newPurchaseRecord);
    fs.writeFileSync(PURCHASES_PATH, JSON5.stringify(allPurchases));
}

function deleteCartByUserEmail(email) {
    const allCarts = getAllCarts();
    delete allCarts[email];
    fs.writeFileSync(CARTS_PATH, JSON5.stringify(allCarts));
}

function insertShippingDetails(email, firstName, lastName, address, city) {
    const ShippingDetails = getAllShippingDetails();
    let newShippingDetailsRecord = {firstName: firstName,
                                    lastName: lastName,
                                    address: address,
                                    city: city};
    ShippingDetails[email] = newShippingDetailsRecord;
    fs.writeFileSync(SHIPPING_DETAILS, JSON5.stringify(ShippingDetails));
}

function insertPaymentMethod(email, paymentMethod) {
    const ShippingDetails = getAllShippingDetails()
    ShippingDetails[email]["PaymentMethod"] = paymentMethod;
    fs.writeFileSync(SHIPPING_DETAILS, JSON5.stringify(ShippingDetails));
}


module.exports = {insertPaymentMethod, deleteCartByUserEmail, insertPurchase, removeProductFromUserCart, addProductToUserCart, insertIntoUsersDetails,
    insertIntoUsersActivities, removeProduct, insertNewProductIntoProducts, insertShippingDetails};

