/*import {App} from "./app"
async function main() {
    const app=new App()
    await app.listen()
}
main();*/
import express from 'express';
import  "express-async-errors";
import routers from "./routes/baseroute";
import bodyParser from 'body-parser';
import cors from 'cors';
import dispachError from "../utils/middlewar-error";

const app = express();
const port = 3000;


// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable all CORS request
app.use(cors());
app.use(routers);

// add custom error handler middleware as the last middleware
app.use(dispachError);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});



