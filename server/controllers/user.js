import {removeProduct, insertIntoUsersDetails, insertIntoActivitiesOfUsers, insertNewProductIntoProducts} from  "../persist.js";
import {getUserByEmail, getUserActivities, checkIfAdmin} from "../data-service/dataService.js";

import errorHandler from '../Errors/errorsHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const saltRounds = 10;
import {removeProductFromCart, getUserShoppingCart, addProductToCart} from './shoppingCart.js';


    export async function authenticateUser(req, next) {
        const {access_token} = req.cookies;

        const decoded = jwt.verify(access_token);

        const {email, password} = decoded;
         const user = await getUserByEmail(email);
         if (!user) {
             return next(errorHandler.notFound("Email doesn't exist is the system"));
         }
 
         let checkPassword = bcrypt.compareSync(password, user.password);
         if (!checkPassword) {
             return next(errorHandler.notFound("Incorrect password"));
         }

         return user;
    }

    export async function register(req, res, next) {
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

    export async function login(req, res, next) {
        console.log(req.payload)
        const {email, password, rememberMe} = req.body;
        console.log(email);
        const user = await getUserByEmail(email);
        if (!user) {
            let message = "Email doesn't exist is the system";
            insertIntoActivitiesOfUsers("Login", email, message);
            return next(errorHandler.internalServer(message));
        }
        let isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {
            let message = "Incorrect password";
            insertIntoActivitiesOfUsers("Login", user.email, message);
            return next(errorHandler.internalServer(message));
        }
        const isAdmin = checkIfAdmin(email);
        const exp = rememberMe ? "10 days" : 30
        insertIntoActivitiesOfUsers("Login", user.email, "Login succeed");

        const token =  json(generateToken(exp, user.email, isAdmin));
        const cookiesOptions = {httpOnly: true, maxAge: rememberMe ? 10*24*60*60 : 30*60 }

        res.cookie("access_token", token, cookiesOptions);

        return isAdmin;

    }

    export async function logout(req,res) {
        res.clearCookie("access_token");
        insertIntoActivitiesOfUsers("Logout", email, "Logout Success");
        res.status(200).send();
    }

    export async function userActivities(req, res) {
        await getUserActivities();
        res.status(200).send();
    }

    export async function addProduct(req, res){
        const user = await authenticateUser(req, next);

        const {isAdmin} = user;

        if(!isAdmin) {
            return next(errorHandler.forbidden("Not an Admin"));
        }

        const {productTitle, productCategory, productImage, productPrice, productDescription} = req.body
        insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription);
        res.status(200).send();
    }

    export async function deleteProduct(req, res){
        const user = await authenticateUser(req, next);

        const {isAdmin} = user;

        if(!isAdmin) {
            return next(errorHandler.forbidden("Not an Admin"));
        }

        const {productTitle, productCategory, productImage, productPrice, productDescription} = req.body
        removeProduct(productTitle, productCategory, productImage, productPrice, productDescription);
        res.status(200).send();
    }
    export async function shoppingCart(req,res){

    }

    export async function addToCart(req, res, next) {
        return await addProductToCart(req, res, next);
    }

    export async function removeFromCart(req,res,next) {
        return await removeProductFromCart(req, res, next);
    }

    export async function checkout(req,res,next){
        const userCart =  await getUserShoppingCart(req, res, next);

        let totalPrice = 0;

        userCart.forEach(element => {
            totalPrice+= element.price;
        });

        return totalPrice;
    }



    export async function check(req, res, next) {
        // const exp = req.body.rememberMe ? "10 days" : 30
        // return res.json(generateToken(exp, req.user.id, req.user.email, req.user.role));
    }


const generateToken = (exp, email, isAdmin) => {
    return jwt.sign(
        {email, isAdmin},
        process.env.SECRET,
        {expiresIn: exp}
    )
}


