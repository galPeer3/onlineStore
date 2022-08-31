import fs from "fs"; 
import JSON5 from "json5";

export const getUserByEmail = async (email) => {
   const users = JSON5.parse(fs.readFileSync("server/data/users.json5"));
   return users.find((user) => user.email == email);
}
export const getUserActivities = async () => {
    const usersActivities = JSON5.parse(fs.readFileSync("/server/data/usersActivities.json5"));
    return usersActivities;
}
export const getUserCart = async (email) => {
    const carts = getAllCarts();
    return carts.find((cart) => cart["email"] == email);

}
export const getAllCarts = async () => {
    const carts = JSON5.parse(fs.readFileSync("/server/data/shoppingCarts.json5"));
    return carts;
}
export const getAllPurchases = async () => {
    const purchases = JSON5.parse(fs.readFileSync("/server/data/purchases.json5"));
    return purchases;
}
export const getPurchaseById = async (orderNumber) => {
    const purchases = getAllPurchases();
    return purchases.find((purchase) => purchase["orderNumber"] == orderNumber);
}
export const getAllUsers = async () => {
    const users = JSON5.parse(fs.readFileSync("/server/data/users.json5"));
    return users;
}
export const getAllProducts = async () => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json5"));
   
   return products;
}

export const getProductById = async (id) => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json5"));
    return products.find((product) => product["id"] == id);
}

export const getHighestProductIdByCategory = async (categoryName) => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json5"));
    const category = products.find((category) => category['name'] == categoryName);
    const categoryProducts = category.products;

    const initialValue = 0;
    const maxId = categoryProducts.reduce(
            (maxId, product) => product["_id"] > maxId? product["_id"]: maxId,
            initialValue
            );

    return maxId;
}

  export const checkIfAdmin = async (email) => {
    const users = JSON5.parse(fs.readFileSync("/server/data/users.json5"));
    const user = users.find((user) => user.email == email);

    return user["isAdmin"];
}




