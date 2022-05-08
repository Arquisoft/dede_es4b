import express, { Application } from "express";
import cors from 'cors';
import bp from 'body-parser';
import https from "https";

import productRouter from "./routers/ProductRouter";
import userRouter from "./routers/UserRouter";
import loginRouter from "./routers/LoginRouter";
import orderRouter from "./routers/OrderRouter";

const { dbConnection } = require('./mongo')

const app: Application = express();

const port = 5000;

const options: cors.CorsOptions = {
    origin: [/\/\/localhost(:\d+)?$/, /\/\/dedethlon\.francecentral\.cloudapp\.azure\.com(:\d+)?$/]
};

app.use(cors(options));
app.use(bp.json());

dbConnection();

//use (añadir las nuevas url)
app.use("/product", productRouter)
app.use("/user", userRouter)
app.use("/login", loginRouter)
app.use("/order", orderRouter)


let credentials = {key: process.env.HTTPS_PRIVATEKEY, cert: process.env.HTTPS_CERTIFICATE};

let httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, function() {
    console.log("Restapi HTTPS escuchando en puerto " + port)
}).on("error",(error:Error)=>{
    console.error('Se produjo un error: ' + error.message);
});
