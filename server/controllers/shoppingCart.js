import JSON5 from "json5";
const jwt = require('jsonwebtoken');
import {getUserCart, getUserByEmail, getAllProducts} from "server/data-service/dataService.js";

class ShoppingCartController {

    async getUserShoppingCart(req, res, next){
       decoded = jwt.verify(req.body);

       const {email, password} = decoded;
        const user = await getUserByEmail(email);
        if (!user) {
            return next(ApiError.internal("Email doesn't exist is the system"));
        }

        let checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return next(ApiError.internal("Incorrect password"));
        }

        const userCart = getUserCart(email) || [];

        return userCart; 
    }
}

module.exports = new ShoppingCartController();