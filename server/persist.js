"use strict";
import JSON5 from "json5";
import fs from "fs";
const dataService = require('server/data-service/date-service');
const USER_ACTIVITY = "server/data/usersActivities.json5";
const USERS_DETAILS = "server/data/users.json5";
const PRODUCTS_PATH = "server/data/products.json5";

// Data that must be persisted:
// User details - done
// Cart
// Purchases
// Login activity - done

const productRecord = (productId, productTitle, productCategory, productImage, productPrice, isInStock, productDescription)  => {
    return {
        _id: productId,
        title: productTitle,
        category: productCategory,
        image: productImage,
        price: productPrice,
        description: productDescription,
    };
}

export function insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription) {
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    let newProductRecord = {id: dataService.getHigestProdcutId() + 1,
                    title: productTitle,
                    category: productCategory,
                    image: productImage,
                    price: productPrice,
                    description:productDescription};
    allProducts.push(newProductRecord);
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(allProducts));
}

export function insertIntoActivitiesOfUsers(activity, email, message){
    const activitiesOfUsers = JSON5.parse(fs.readFileSync(USER_ACTIVITY));
    let newActivityRecord = {activity: activity,
                            date: new Date(),
                            email: email,
                            event: message};
    activitiesOfUsers.push(newActivityRecord);
    fs.writeFileSync(USER_ACTIVITY, JSON5.stringify(activitiesOfUsers));
}

export function insertIntoUsersDetails(email, hashPassword, isAdmin){
    const usersDetails = JSON5.parse(fs.readFileSync(USERS_DETAILS));
    let newUserRecord = {email: email,
                        hashPassword: hashPassword,
                        isAdmin: isAdmin};
    usersDetails.push(newUserRecord);
    fs.writeFileSync(USERS_DETAILS, JSON5.stringify(usersDetails));
}


