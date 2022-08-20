const Router = require('express')
const router = new Router()
const userController = require('../controllers/user')
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.get('/auth', authMiddleware, user.js.check)

module.exports = router


userRouter.post("/api/login", (req, res) => {
    const username = req.body.username;
    const validationResult = validateUnecryptedPassword(
        username,
        req.body.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        insertToUsersActivities("Login", username, "Faliure");
        return;
    }
    const maxAgeMinutes = req.body.rememberMe ? 60 * 24 * 30 : 30;
    const maxAge = 1000 * 60 * maxAgeMinutes;
    const cookieData = {
        username: username,
        password: validationResult.encryptedPassword,
    };
    res.cookie("loginCookie", cookieData, { maxAge: maxAge, httpOnly: true });

    insertToUsersActivities("Login", username, "Success");
    res.status(200).send();
});

userRouter.get("/api/getUserDetails", (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(
        user,
        loginCookie.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        return;
    }
    const allUsersCart = getAllUsersCart();
    if (allUsersCart[loginCookie.username]) {
        res.status(200).send({
            username: loginCookie.username,
            cartSize: (Object.keys(allUsersCart[loginCookie.username]) || []).length,
        });
    } else {
        res.status(200).send({
            username: loginCookie.username,
            cartSize: 0,
        });
    }
});

userRouter.post("/api/register", (req, res) => {
    const { username, password, email, fullName, rememberMe } = req.body;
    if (findUser(username) != null) {
        res.status(409).send({
            validationError: "User already exists",
        });
        return;
    }
    const encryptedPassword = req.body.password;
    if (encryptedPassword.length <= 6) {
        res.status(400).send({
            validationError: "Password is too short",
        });
        return;
    }

    insertToUsers(username, password, fullName, email);
    const maxAgeMinutes = rememberMe ? 60 * 24 * 30 : 30;
    const maxAge = 1000 * 60 * maxAgeMinutes;
    const cookieData = { username: username, password: password };
    res.cookie("loginCookie", cookieData, { maxAge: maxAge, httpOnly: true });
    res.status(200).send();
});

userRouter.get("/api/logout", (req, res) => {
    res.clearCookie("loginCookie");
    insertToUsersActivities(
        "Logout",
        req.cookies.loginCookie.username,
        "Success"
    );
    res.status(200).send();
});

userRouter.get("/api/getUserCart", (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(
        user,
        loginCookie.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        return;
    }
    const allUsersCart = getAllUsersCart();
    res.status(200).send({
        userCartItems: allUsersCart[loginCookie.username] || [],
    });
});

userRouter.post("/api/addItemToCart", (req, res) => {
    const { productId, qty } = req.body;
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(
        user,
        loginCookie.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        return;
    }

    insertToUsersActivities(
        `Add To Cart: Prodect ID: ${productId}`,
        loginCookie.username,
        "Success"
    );
    insertProductToUserCart(loginCookie.username, productId, qty);

    res.status(200).send();
});

userRouter.post("/api/removeItemFromCart", (req, res) => {
    const { productId } = req.body;
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(
        user,
        loginCookie.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        return;
    }
    deleteProductFromUserCart(loginCookie.username, productId);
    res.status(200).send();
});

userRouter.post("/api/shipping", (req) => {
    const { fullName, address, city, postalCode, country } = req.body;
    const { loginCookie } = req.cookies;
    const username = loginCookie.username;
    insertShippingDetails(username, fullName, address, city, postalCode, country);
});

userRouter.post("/api/Payment", (req) => {
    const { PaymentMethod } = req.body;
    const { loginCookie } = req.cookies;
    const username = loginCookie.username;
    insertPaymentMethod(username, PaymentMethod);
});

userRouter.get("/api/getShippingDetails", (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    let userName = loginCookie.username;
    const user = findUser(userName);
    const validationResult = validateEncryptedPassword(
        user,
        loginCookie.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        return;
    }
    const allUsersShippingData = getUserShipping();
    let shipping = allUsersShippingData[userName];
    res.status(200).send({
        username: userName,
        fullName: shipping["fullName"],
        address: shipping["address"],
        city: shipping["city"],
        postalCode: shipping["postalCode"],
        country: shipping["country"],
        PaymentMethod: shipping["PaymentMethod"],
    });
});

userRouter.post("/api/removeCart", (req, res) => {
    const { loginCookie } = req.cookies;
    if (!loginCookie) {
        res.status(401).send({
            validationError: "No cookie",
        });
        return;
    }
    const user = findUser(loginCookie.username);
    const validationResult = validateEncryptedPassword(
        user,
        loginCookie.password
    );
    if (validationResult.validationError) {
        res.status(401).send({
            validationError: validationResult.validationError,
        });
        return;
    }
    orderNumber++;
    const allUsersCart = getAllUsersCart();
    const purchase = allUsersCart[loginCookie.username] || {};
    insertPurchaseToUser(loginCookie.username, orderNumber, purchase);
    deleteUserCart(loginCookie.username);
    res.status(200).send();
});

userRouter.get("/api/userActivity", (req, res) => {
    const isUserAdmin = isAdmin(req);
    if (!isUserAdmin) {
        res.status(401).send({
            validationError: "You are not an admin!.",
        });
    }
    res.send(getActivity());
});

export default userRouter;