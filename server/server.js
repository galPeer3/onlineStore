import express from "express";
import routes from "./routes/routes.js";
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const port = process.env.PORT || 5000;


const app = express();
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());

app.use('/api', routes);


app.get("/", (req, res) => {
    res.send("Server is ready");
});








app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});
