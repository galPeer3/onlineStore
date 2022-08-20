import {insertIntoUsersDetails, insertIntoActivitiesOfUsers} from "../persist";

const errorHandler = require('././Errors/errorsHandler');
const admin = require('../persist.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
require('../persist.js');
const dataService = require('server/data-service/date-service');

import { isAdmin } from "../routes/productRouter.js";

class UserController {
    async register(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(errorHandler.notFound("Missing email or password"));
        }
        const isEmailExist = await dataService.findUserByEmail(email);
        if (isEmailExist) {
            return next(errorHandler.notFound("This email already exists"))
        }
        // create the salt and hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // const user = await User.create({email, password: hashPassword, isAdmin});
        // const cart = await Cart.create({userId: user.id});
        insertIntoUsersDetails(email, hashPassword);
        return ;
        // const exp = rememberMe ? "10 days" : 30
        // return res.json(generateToken(exp, user.id, user.email, user.role));
    }

    async login(req, res, next) {
        const {email, password, rememberMe} = req.body;
        const user = await dataService.findUserByEmail(email);
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
        const isAdmin = dataService.chaeckIfAdmin(email);
        const exp = rememberMe ? "10 days" : 30
        insertIntoActivitiesOfUsers("Login", user.email, "Login succeed");
        return res.json(generateToken(exp, user.email, isAdmin));
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