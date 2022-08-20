"use strict";
import JSON5 from "json5";
// import bcrypt from "bcryptjs";
import fs from "fs";

// Data that must be persisted:
// User details
// Cart
// Purchases
// Login activity

const productRecord = (productId, productTitle, productCategory, productImage, productPrice, isInStock, productDescription)  => {
    return {
        _id: productId,
        title: productTitle,
        category: productCategory,
        image: productImage,
        price: productPrice,
        isInStock: isInStock,
        description: productDescription,
    };
}

export function InsertNewProduct(productTitle, productCategory, productImage, productPrice, isInStock, productDescription) {
    const allProductsRecords = JSON5.parse(fs.readFileSync(PRODUCTS_FILE_PATH));
    const newProductId = getHigestProdcutId() + 1;
    allProductsRecords.push(productRecord('' + newProductId, productTitle, productCategory, productImage, productPrice, isInStock, productDescription)
    );
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON5.stringify(allProducts, null, 2));
}

