const JSON5 = require("json5");
const fs  = require("fs");
const {getProductById, getHighestProductIdByCategory, getAllCarts, getUserCart, getAllPurchases, getPurchaseById} = require('./data-service/dataService.js');
const USERS_ACTIVITY = "./data/usersActivities.json5";
const USERS_DETAILS = "./data/users.json5";
const PRODUCTS_PATH = "./data/products.json5";
const CART_PATH = "./data/shoppingCarts.json5";
const PURCHASES_PATH = "./data/purchases.json5";

// Data that must be persisted:
// User details - done
// Cart - done
// Purchases - done
// Login activity - done

function insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription) {
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    const categoryIndex = products.indexOf((category) => category['name'] == categoryName);
    let newProductRecord = {_id: getHighestProductIdByCategory() + 1,
        title: productTitle,
        category: productCategory,
        image: productImage,
        price: productPrice,
        description:productDescription};
    allProducts[categoryIndex].products.push(newProductRecord);
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(allProducts));
}

function removeProduct(productTitle, productCategory, productImage, productPrice, productDescription) {
    const allProducts = JSON5.parse(fs.readFileSync(PRODUCTS_PATH));
    const categoryIndex = products.indexOf((category) => category['name'] == categoryName);
    allProducts[categoryIndex].products.filter((product)=>product.title != title );
    fs.writeFileSync(PRODUCTS_PATH, JSON5.stringify(allProducts));
}

function insertIntoActivitiesOfUsers(activity, email, message){ //login,logout,add-to-cart
    const activitiesOfUsers = JSON5.parse(fs.readFileSync(USER_ACTIVITY));
    let newActivityRecord = {activity: activity,
                            date: new Date(),
                            email: email,
                            event: message};
    activitiesOfUsers.push(newActivityRecord);
    fs.writeFileSync(USERS_ACTIVITY, JSON5.stringify(activitiesOfUsers));
}

function insertIntoUsersDetails(email, hashPassword, isAdmin){
    const usersDetails = JSON5.parse(fs.readFileSync(USERS_DETAILS));
    let newUserRecord = {email: email,
                        hashPassword: hashPassword,
                        isAdmin: isAdmin};
    usersDetails.push(newUserRecord);
    fs.writeFileSync(USERS_DETAILS, JSON5.stringify(usersDetails));
}


function insertProductToUserCart(email, productId) {
    const allCarts = getAllCarts();
    const productToAdd = getProductById(productId);
    allCarts[email]["products"].push(productToAdd)
    fs.writeFileSync(CART_PATH, JSON5.stringify(allCarts));
}

function deleteProductFromUserCart(email, productId) {
    const allCarts = getAllCarts();
    const userCart = getUserCart(email);
    if (userCart)  delete userCart[productId];
    fs.writeFileSync(CART_PATH, JSON5.stringify(allCarts));
}

function insertPurchase(email, orderNumber) {
    const allPurchases = getAllPurchases();
    const purchaseToAdd = getPurchaseById(orderNumber);
    allPurchases[email].push(purchaseToAdd);
    fs.writeFileSync(PURCHASES_PATH, JSON5.stringify(allPurchases));
}

function deleteCartByUserEmail(email) {
    const allCarts = getAllCarts();
    delete allCarts[email];
    fs.writeFileSync(CART_PATH, JSON5.stringify(allCarts));
}

function insertPaymentMethod(username, paymentMethod) {
    const ShippingDetails = JSON5.parse(
        fs.readFileSync(USER_SHIPPING_DATA_FILE_PATH)
    );
    ShippingDetails[username]["PaymentMethod"] = paymentMethod;

    fs.writeFileSync(
        USER_SHIPPING_DATA_FILE_PATH,
        JSON5.stringify(ShippingDetails, null, 2)
    );
}


module.exports = {insertPaymentMethod, deleteCartByUserEmail, insertPurchase, deleteProductFromUserCart, 
insertProductToUserCart, insertIntoUsersDetails, insertIntoActivitiesOfUsers, removeProduct,
insertNewProductIntoProducts};

