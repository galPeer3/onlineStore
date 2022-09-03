const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;


app.use('/api', routes);


app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});

module.exports = {app};