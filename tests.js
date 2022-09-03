import fetch from "node-fetch";


let token = "";

function register() {
    const data = {
        email: "test@",
        password: "test%",
        rememberMe: true,
    };
    return (
        fetch("http://localhost:5000/api/user/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
        .then((data) => {
            if (data.status === 200) {
                console.log("Success register:" + data.status);
            } 
            else{
                console.log("Failed register:" + data.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function login() {
    const data = {
        email: "admin",
        password: "admin",
    };

    return (
        fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
            },
            credentials: "include",
        })
        .then((data) => {
            token = data.headers.get("set-cookie");
            if (data.status === 200) {
                console.log("Success login:" + data.status);
            } 
            else{
                console.log("Failed login:" + data.status);
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        })
    );
}

function addItemToCart() {
    const data = {
        productId: "1",
        categoryName: "Soccer",
    };

    return (
        fetch("http://localhost:5000/api/user/addToCart", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            console.log("add this item to cart: ", data);
            if (res.status === 200) {
                console.log("Success addItemToCart:" + res.status);
            } else {
                console.log("FAILURE. status: " + res.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function removeItemFromCart() {
    const data = {
        productId: "1",
        categoryName: "Soccer"
    };

    return (
        fetch("http://localhost:5000/api/user/removeFromCart", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cache: "no-cache",
                cookie: token,
            },
            credentials: "include",
        })
        .then((res) => {
            console.log("remove this item from cart: ", data);
            if (res.status === 200) {
                console.log("Success removeItemFromCart:" + res.status);
            } else {
                console.log("FAILURE. status: " + res.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function getUserCart() {
    return (
        fetch("http://localhost:5000/api/user/cart", {
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
        .catch((error) => {
            console.error("Error:", error);
        })
    );
}

function getUserActivities() {
    return (
        fetch("http://localhost:5000/api/user/adminScreen/userActivities", {
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
            console.log("Success user activities :", data);
        })
        .catch((error) => {
            console.log("Error:", error);
        })
    );
}

async function run() {
    console.log("Test");
    await register();
    await login();
    await getUserActivities();
    await addItemToCart();
    await getUserCart();
    await removeItemFromCart();
    console.log("Done Tests!");
}

run();
