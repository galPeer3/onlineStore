import {insertIntoUsersDetails, insertIntoActivitiesOfUsers} from "../persist";
import {getUserByEmail} from "../data-service/dataService";
const errorHandler = require('././Errors/errorsHandler');
const admin = require('../persist.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const dataService = require('server/data-service/dataService');

class UserController {
    async register(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(errorHandler.notFound("Missing email or password"));
        }
        const user = await dataService.getUserByEmail(email);
        if (user) {
            return next(errorHandler.notFound("This email already exists"))
        }
        // create the salt and hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        insertIntoUsersDetails(email, hashPassword);

        return ;
        // const exp = rememberMe ? "10 days" : 30
        // return res.json(generateToken(exp, user.id, user.email, user.role));
    }

    async login(req, res, next) {
        const {email, password, rememberMe} = req.body;
        const user = await dataService.getUserByEmail(email);
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
        const isAdmin = dataService.checkIfAdmin(email);
        const exp = rememberMe ? "10 days" : 30
        insertIntoActivitiesOfUsers("Login", user.email, "Login succeed");
        return res.json(generateToken(exp, user.email, isAdmin));
    }

    async logout(req,res) {
        const {token,email} = req.body;
        localStorage.removeItem('token'); //not done
        insertIntoActivitiesOfUsers("Logout", email, "Logout Success");
        res.status(200).send();
    }

    async userActivities(req, res) {
        await dataService.getUserActivities();
        res.status(200).send();
    }

    async addProduct(req, res){
        const {productTitle, productCategory, productImage, productPrice, productDescription} = req.body
        admin.insertNewProductIntoProducts(productTitle, productCategory, productImage, productPrice, productDescription);
        res.status(200).send();
    }

    async shoppingCart(req,res){

    }

    async addToCart(req, res, next) {

    }

    async removeFromCart(req,res,next) {

    }

    async checkout(req,res,next){

    }



    async check(req, res, next) {
        // const exp = req.body.rememberMe ? "10 days" : 30
        // return res.json(generateToken(exp, req.user.id, req.user.email, req.user.role));
    }
}

const generateToken = (exp, email, isAdmin) => {
    return jwt.sign(
        {email, isAdmin},
        process.env.SECRET,
        {expiresIn: exp}
    )
}


module.exports = new UserController();