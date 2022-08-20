const dotenv = require('dotenv');
const express = require ("express");
const routes = require ("./routes/routes.js");
const path = require('path');
const { getAllProducts } = require ("./persist.js");
const port = process.env.PORT || 5000;


const app = express();
app.use('/api', routes);

app.get("/api/products/:id", (req, res) => {
    const data = getAllProducts();
    const product = data.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not Found" });
    }
});

app.get("/api/products", (req, res) => {
    const data = getAllProducts();
    res.send(data);
});

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});