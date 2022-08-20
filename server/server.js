const dotenv = require('dotenv');
const express = require ("express");
const routes = require ("./routes/routes.js");
const path = require('path');
const { getAllProducts } = require ("./persist.js");
const port = process.env.PORT || 5000;


const app = express();
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});