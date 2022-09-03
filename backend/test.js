const userToLogin = {
    email: "gild@post.idc.ac.il",
    password: "1234567890",
    rememberMe: true,
}

const userToRegister = {
    email: "gild@post.idc.ac.il",
    password: "1234567890",
    rememberMe: true,
}

const product = {
    _id: 11,
    title: "Waterproof bag",
    category: "Watersport",
    image: "./Images/watersport/waterproof-dry-bag.jpeg",
    price: "225",
    description: "waterproof dry bag"
}

const newActivityRecord = {
    activity: "Login",
    date: new Date(),
    email: "gild@post.idc.ac.il",
    event: "Login succeed"
};

import fetch from "node-fetch";
const app = require("./server.js");
const userRouter = require("./routes/user");
const productsRouter = require("./routes/products");


let token = "";

function register() {
    return (
        fetch("http://localhost:3000/api/user/register", {
            method: 'POST',
            body: JSON.stringify(userToRegister),
        })
            .then((user) => {
                if (user.status === 200) {
                    console.log("Success register:" + user.status);
                } else {
                    console.log("FAILURE. status: " + user.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    );
}

function login() {
    return (
        fetch("http://localhost:3000/api/user/login/", {
            method: 'POST',
            headers : {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
            },
        })
            .then((data) => {
                token = data.headers.get("access_token");
                console.log(
                   data.status + "user connected successfully"
                );
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    );
}

// function addItemToCart() {
//
//     return (
//         fetch("http://localhost:5000/api/addItemToCart/", {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 Cache: "no-cache",
//                 cookie: token,
//             },
//             credentials: "include",
//         })
//             .then((res) => {
//                 console.log("add this item to cart: ", data);
//                 if (res.status === 200) {
//                     console.log("Success addItemToCart:" + res.status);
//                 } else {
//                     console.log("FAILURE. status: " + res.status);
//                 }
//             })
//             //Then with the error genereted...
//             .catch((error) => {
//                 console.error("Error:", error);
//             })
//     );
// }
//
// function removeItemFromCart() {
//     const data = {
//         productId: "1",
//     };
//
//     return (
//         fetch("http://localhost:5000/api/removeItemFromCart/", {
//             method: "POST",
//             body: JSON.stringify(data),
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 Cache: "no-cache",
//                 cookie: token,
//             },
//             credentials: "include",
//         })
//             .then((res) => {
//                 console.log("remove this item from cart: ", data);
//                 if (res.status === 200) {
//                     console.log("Success removeItemFromCart:" + res.status);
//                 } else {
//                     console.log("FAILURE. status: " + res.status);
//                 }
//             })
//             //Then with the error genereted...
//             .catch((error) => {
//                 console.error("Error:", error);
//             })
//     );
// }

function getUserCart() {
    return (
        fetch("http://localhost:3000/api/users/cart/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Success get user cart:", data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error("Error:", error);
            })
    );
}

function getUserDetails() {
    return (
        fetch("http://localhost:5000/api/getUserDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Success user details :", data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error("Error:", error);
            })
    );
}

function getProduct() {
    return (
        fetch("http://localhost:5000/api/products/1", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
            },
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Success get product with the id=1:", data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error("Error:", error);
            })
    );
}

function setShippingAddress() {
    const data = {
        fullName: "Yardena  Berkovic",
        address: "Settlement Iksal, P.O. Box: 174",
        city: "Tel-Aviv",
        postalCode: "7752368",
        country: "israel",
    };
    console.log("add new shipping address: ", data);

    return fetch("http://localhost:5000/api/shipping/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cache: "no-cache",
            cookie: token,
        },
        credentials: "include",
    });
}

function setPaymentMethod() {
    const data = {
        PaymentMethod: "Paypal",
    };
    console.log("set payment method: ", data);
    return fetch("http://localhost:5000/api/payment/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cache: "no-cache",
            cookie: token,
        },
        credentials: "include",
    });
}

function getShippingDetails() {
    return (
        fetch("http://localhost:5000/api/getShippingDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Success The Shipping Details :", data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error("Error:", error);
            })
    );
}

async function run() {
    console.log("Test");
    await register();
    await login();
    await getUserDetails();
    await getProduct();
    await addItemToCart();
    await getUserCart();
    await removeItemFromCart();
    await getUserCart();
    console.log("Done Tests!");
}

run();
