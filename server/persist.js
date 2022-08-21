"use strict";
import JSON5 from "json5";
import fs from "fs";
const dataService = require('server/data-service/dataService.js');
const USERS_ACTIVITY = "server/data/usersActivities.json5";
const USERS_DETAILS = "server/data/users.json5";
const PRODUCTS_PATH = "server/data/products.json5";
const CART_PATH = "server/data/shoppingCarts.json5";
const PURCHASES_PATH = "server/data/purchases.json5";

// Data that must be persisted:
// User details - done
// Cart - done
// Purchases - done
// Login activity - done

export function insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription) {
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    let newProductRecord = {_id: dataService.getHighestProductId() + 1,
        title: productTitle,
        category: productCategory,
        image: productImage,
        price: productPrice,
        description:productDescription};
    allProducts.push(newProductRecord);
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(allProducts));
}

export function insertIntoActivitiesOfUsers(activity, email, message){ //login,logout,add-to-cart
    const activitiesOfUsers = JSON5.parse(fs.readFileSync(USER_ACTIVITY));
    let newActivityRecord = {activity: activity,
                            date: new Date(),
                            email: email,
                            event: message};
    activitiesOfUsers.push(newActivityRecord);
    fs.writeFileSync(USERS_ACTIVITY, JSON5.stringify(activitiesOfUsers));
}

export function insertIntoUsersDetails(email, hashPassword, isAdmin){
    const usersDetails = JSON5.parse(fs.readFileSync(USERS_DETAILS));
    let newUserRecord = {email: email,
                        hashPassword: hashPassword,
                        isAdmin: isAdmin};
    usersDetails.push(newUserRecord);
    fs.writeFileSync(USERS_DETAILS, JSON5.stringify(usersDetails));
}


export function insertProductToUserCart(email, productId) {
    const allCarts = dataService.getAllCarts();
    const productToAdd = dataService.getProductById(productId);
    allCarts[email]["products"].push(productToAdd)
    fs.writeFileSync(CART_PATH, JSON5.stringify(allCarts));
}

export function deleteProductFromUserCart(email, productId) {
    const allCarts = dataService.getAllCarts();
    const userCart = dataService.getUserCart(email);
    if (userCart)  delete userCart[productId];
    fs.writeFileSync(CART_PATH, JSON5.stringify(allCarts));
}

export function insertPurchase(email, orderNumber) {
    const allPurchases = dataService.getAllPurchases();
    const purchaseToAdd = dataService.getPurchaseById(orderNumber);
    allPurchases[email].push(purchaseToAdd);
    fs.writeFileSync(PURCHASES_PATH, JSON5.stringify(allPurchases));
}

export function deleteCartByUserEmail(email) {
    const allCarts = dataService.getAllCarts();
    delete allCarts[email];
    fs.writeFileSync(CART_PATH, JSON5.stringify(allCarts));
}

export function insertPaymentMethod(username, paymentMethod) {
    const ShippingDetails = JSON5.parse(
        fs.readFileSync(USER_SHIPPING_DATA_FILE_PATH)
    );
    ShippingDetails[username]["PaymentMethod"] = paymentMethod;

    fs.writeFileSync(
        USER_SHIPPING_DATA_FILE_PATH,
        JSON5.stringify(ShippingDetails, null, 2)
    );
}


