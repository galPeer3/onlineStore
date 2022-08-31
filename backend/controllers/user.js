const {removeProduct, insertIntoUsersDetails, insertIntoActivitiesOfUsers, insertNewProductIntoProducts} = require("../persist.js");
const {getUserByEmail, getUserActivities, checkIfAdmin} = require("../data-service/dataService");

const errorHandler = require('../Errors/errorsHandler.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const {removeProductFromCart, getUserShoppingCart, addProductToCart} = require('./shoppingCart.js');


    async function authenticateUser(req, next) {
        //const {access_token} = req.cookies;
        const {token} = req.body;
        let decoded;
        try{
         decoded = jwt.verify(token, "secret_123456");
        }
        catch(error){
            return next(errorHandler.notFound("invalid token"));

        }

        
        const {email, password} = decoded;
         const user = await getUserByEmail(email);
         
         if (!user) {
             return next(errorHandler.notFound("Email doesn't exist in the system"));
         }

         let checkPassword = password == user.password;
         if (!checkPassword) {
            
             return next(errorHandler.notFound("Incorrect password"));
         }
         
         return user;
        
    }

    async function register(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(errorHandler.notFound("Missing email or password"));
        }
        const user = await getUserByEmail(email);
        if (user) {
            return next(errorHandler.notFound("This email already exists"))
        }
        // create the salt and hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        insertIntoUsersDetails(email, hashPassword);

        return ;

    }

    async function login(req, res, next) {
        const {email, password, rememberMe} = req.body;

        if(email == "") {
            let message = "invalid email";
            return next(errorHandler.internalServer(message));
        }
        const user = await getUserByEmail(email);
        if (!user) {
            let message = "Email doesn't exist in the system";
            return next(errorHandler.internalServer(message));
        }

        let isCorrectPassword = bcrypt.compareSync(password, user.password);

        if (!isCorrectPassword) {
            let message = "Incorrect password";
            return next(errorHandler.internalServer(message));
        }

        const isAdmin = checkIfAdmin(email);
        const exp = rememberMe ? "10 days" : 30*60
       // insertIntoActivitiesOfUsers("Login", user.email, "Login succeed");
        const token = JSON.stringify(generateToken(exp, user.email, user.password, isAdmin));
        const cookiesOptions = {httpOnly: true, maxAge: rememberMe ? 10*24*60*60 : 30*60 }
        res.cookie("access_token", token, cookiesOptions);
        res.status(200).send(token);

    }

    async function logout(req,res) {
        res.clearCookie("access_token");
        insertIntoActivitiesOfUsers("Logout", email, "Logout Success");
        res.status(200).send();
    }

    async function userActivities(req, res) {
        await getUserActivities();
        res.status(200).send();
    }

    async function addProduct(req, res){
        const user = await authenticateUser(req, next);

        const {isAdmin} = user;

        if(!isAdmin) {
            return next(errorHandler.forbidden("Not an Admin"));
        }

        const {productTitle, productCategory, productImage, productPrice, productDescription} = req.body
        insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription);
        res.status(200).send();
    }

    async function deleteProduct(req, res){
        const user = await authenticateUser(req, next);

        const {isAdmin} = user;

        if(!isAdmin) {
            return next(errorHandler.forbidden("Not an Admin"));
        }

        const {productTitle, productCategory, productImage, productPrice, productDescription} = req.body
        removeProduct(productTitle, productCategory, productImage, productPrice, productDescription);
        res.status(200).send();
    }
    async function shoppingCart(req, res, next){
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }

        const cart = await getUserShoppingCart(req, user, next);

        return res.status(200).send(cart);
    }

    async function addToCart(req, res, next) {
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        await addProductToCart(req, user);
    }

    async function removeFromCart(req,res,next) {
        const user = await authenticateUser(req, next);
        if(!user){
            return next(errorHandler.notFound("user not found"));
        }
        return await removeProductFromCart(req, user, next);
    }

    async function checkout(req,res,next){
        const userCart =  await getUserShoppingCart(req, res, next);

        let totalPrice = 0;

        userCart.forEach(element => {
            totalPrice+= element.price;
        });

        return totalPrice;
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

module.exports = {check, checkout, removeFromCart, addToCart, shoppingCart, deleteProduct,
    addProduct, authenticateUser, login, register, logout, userActivities};


