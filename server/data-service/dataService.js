

export const getUserByEmail = async (email) => {
   const users = JSON5.parse(fs.readFileSync("/server/data/users.json"));
   
   return users.find((user) => user.email == email);
}

export const getUserCart = async(email) => {
    const carts = JSON5.parse(fs.readFileSync("/server/data/shoppingCarts.json"));

    return carts.find((cart) => cart["email"] == email);

}

export const getUsers = async () => {
    const users = JSON5.parse(fs.readFileSync("/server/data/users.json"));
   
   return users;
}

export const getAllProducts = async () => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json"));
   
   return products;
}

export const getHighestProductId = async () => {
    const products = JSON5.parse(fs.readFileSync("/server/data/products.json"));

    const initialValue = 0;
    const maxId = products.reduce(
            (maxId, product) => product["_id"] > maxId? product["_id"]: maxId,
            initialValue
            );

    return maxId;
}

export const checkIfAdmin = async (email) => {
    const users = JSON5.parse(fs.readFileSync("/server/data/users.json"));
    const user = users.find((user) => user.email == email);

    return user["isAdmin"];
}




