const errorHandler = require('././Errors/errorsHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
require('../routes/persist.js');
import { isAdmin } from "../routes/productRouter.js";

const {User, Cart: Cart} = require('../models/models')

class UserController {
    async register(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(errorHandler.notFound("Missing email or password"));
        }
        const isEmailExist = await User.findOne({where: {email}})
        if (isEmailExist) {
            return next(errorHandler.notFound("This email already exists"))
        }
        // create the salt and hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const user = await User.create({email, password: hashPassword, role})
        const cart = await Cart.create({userId: user.id})
        const exp = req.body.rememberMe ? "10 days" : 30
        return res.json(generateToken(exp, user.id, user.email, user.role));
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal("Email doesn't exist is the system"));
        }

        let isCorrectPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectPassword) {
            return next(ApiError.internal("Incorrect password"));
        }

        const exp = req.body.rememberMe ? "10 days" : 30

        return res.json(generateToken(exp, user.id, user.email, user.role));
    }


    async check(req, res, next) {
        const exp = req.body.rememberMe ? "10 days" : 30
        return res.json(generateToken(exp, req.user.id, req.user.email, req.user.role));
    }
}

const generateToken = (exp, id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET,
        {expiresIn: exp}
    )
}


module.exports = new UserController();