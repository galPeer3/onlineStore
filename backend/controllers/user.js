const {removeProduct, insertShippingDetails, deleteCartByUserEmail, insertPurchase, insertPaymentMethod,insertIntoUsersDetails,
    insertIntoUsersActivities, insertNewProductIntoProducts, addProductToUserCart, createCart} = require("../persist.js");

const {getUserByEmail, getUserActivities, checkIfAdmin, getUserCart} = require("../dataService");

const errorHandler = require('../Errors/errorsHandler.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {removeProductFromUserCart} = require("../persist");
const saltRounds = 10;
let orderNumber = 0;

async function authenticateAdmin(req, next) {
    const {access_token} = req.cookies;
    if(!access_token) {
        return next(errorHandler.notFound("Session expired"));

    }
    const {email, password} = access_token;

    const user = await getUserByEmail(email);

     if (!user) {
         return next(errorHandler.notFound("Email doesn't exist in the system"));
     }

     let checkPassword = password == user.hashPassword;
     if (!checkPassword) {
         return next(errorHandler.notFound("Incorrect password"));
     }

     return user.isAdmin;
}

async function authenticateUser(req, next) {
    const {access_token} = req.cookies;
    if(!access_token) {
        return next(errorHandler.notFound("Session expired"));

    }
    const {email, password} = access_token;

    const user = await getUserByEmail(email);
     if (!user) {
         return next(errorHandler.notFound("Email doesn't exist in the system"));
     }

     let checkPassword = password == user.hashPassword;
     if (!checkPassword) {
         return next(errorHandler.notFound("Incorrect password"));
     }
     
     if(!user.isAdmin) {
        return next(errorHandler.notFound("User is not admin"));
     }

     return user;
}


async function register(req, res, next) {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(errorHandler.notFound("Missing email or password"));
    }

    if(email.indexOf('@') == -1){
        let message = "invalid email";
        return next(errorHandler.internalServer(message));
    }
    const user = await getUserByEmail(email);
    if (user) {
        return next(errorHandler.notFound("This email already exists"))
    }
    // create the salt and hash the password
    const hashPassword = await bcrypt.hash(password, saltRounds);
    await insertIntoUsersDetails(email, hashPassword);
    await insertIntoUsersActivities("Register", email, "Register succeed");
    await createCart(email);
    res.status(200).send(true);
}

async function login(req, res, next) {
    const {email, password, rememberMe} = req.body;

    if(email == "") {
        let message = "invalid email";
        return next(errorHandler.internalServer(message));
    }
    if(email != "admin" && email.indexOf('@') == -1){
        let message = "invalid email";
        return next(errorHandler.internalServer(message));
    }

    const user = await getUserByEmail(email);
    if (!user) {
        let message = "Email doesn't exist in the system";
        return next(errorHandler.internalServer(message));
    }
        let isCorrectPassword = bcrypt.compareSync(password, user.hashPassword);

        if (!isCorrectPassword) {
            let message = "Incorrect password";
            return next(errorHandler.internalServer(message));
        }

        const isAdmin = checkIfAdmin(email);
        const exp = rememberMe ? "10d" : "1800s"
        await insertIntoUsersActivities("Login", user.email, "Login succeed");
        const token = JSON.stringify(generateToken(exp, user.email, user.password, isAdmin));
        const cookiesOptions = {httpOnly: true, maxAge: rememberMe ? 10*24*60*60*1000 : 30*60*1000 }
        res.cookie("access_token", {email: user.email, password: user.hashPassword}, cookiesOptions);
        res.status(200).send(token);
    }

    async function logout(req,res) {
        const {access_token} = req.cookies;
        if(!access_token){
            return next(errorHandler.notFound("user not logged in"));

        }
        const {email} = access_token;
        res.clearCookie("access_token");
        insertIntoUsersActivities("Logout", email, "Logout Success");
        res.status(200).send(true);
    }

    async function userActivities(req, res, next) {
        const userActivities = await getUserActivities();
        res.status(200).send(userActivities);
    }

    async function addProduct(req, res, next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        const {isAdmin} = user;

        if(!isAdmin) {
            return next(errorHandler.forbidden("Not an Admin"));
        }

        const {productTitle, productCategory, productImage, productPrice, productDescription} = req.body
        const isSuccess = await insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription);

        if(!isSuccess){
            return next(errorHandler.forbidden("Invalid category"));
        }
        await insertIntoUsersActivities("Add product", user.email, "Adding success");

        res.status(200).send(true);
    }

    async function deleteProduct(req, res, next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }

        const {isAdmin} = user;

        if(!isAdmin) {
            return next(errorHandler.forbidden("Not an Admin"));
        }

        const {productId, categoryName} = req.body
        await removeProduct(productId, categoryName);
        await insertIntoUsersActivities("Delete product", user.email, "deleted success");

        res.status(200).send(true);
    }

    async function shoppingCart(req, res, next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        const {email} = req.body;
        const cart = getUserCart(email)  || [];
        return res.status(200).json(cart);
    }

    async function addToCart(req, res, next) {
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        const {productId, categoryName} = req.body;
        await addProductToUserCart(user.email, productId, categoryName);
        res.status(200).send(true);
    }

    async function removeFromCart(req,res,next) {
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }

        const {email,productId} = req.body;
        removeProductFromUserCart(email,productId);
        res.status(200).send();
    }

    async function checkout(req,res,next){
        const {email} = req.body;
        const userCart =  await getUserCart(email);

        let totalPrice = 0;

        userCart.forEach((product) => {
            totalPrice += product.price
        });
        res.status(200).send(totalPrice);
    }

    async function payment(req,res,next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        const {email, paymentMethod} = req.body;
        insertPaymentMethod(email, paymentMethod);
        res.status(200).send();
    }

    async function shipping(req,res,next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        const {email, firstName, lastName, address, city} = req.body;
        insertShippingDetails(email, firstName, lastName, address, city);
        res.status(200).send();
    }

    async function purchaseCompleted(req,res,next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        const {email, purchase} = req.body;
        insertPurchase(email,orderNumber,purchase);
        deleteCartByUserEmail(email);
        orderNumber++;
        res.status(200).json("Purchase completed successfully");
    }

    async function check(req, res, next) {
        // const exp = req.body.rememberMe ? "10 days" : 30
        // return res.json(generateToken(exp, req.user.id, req.user.email, req.user.role));
    }


const generateToken = (exp, email, password, isAdmin) => {
    return jwt.sign(
        {email: email, password: password, isAdmin: isAdmin},
        "secret_123456",
        {expiresIn: exp}
    )
}

module.exports = {check, checkout,payment, shipping, purchaseCompleted, removeFromCart, addToCart, shoppingCart, deleteProduct,
    addProduct, login, register, authenticateAdmin, logout, userActivities};


