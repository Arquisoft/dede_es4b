import express, { Application } from "express";
import cors from 'cors';
import bp from 'body-parser';

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

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
    
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});
