import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import productRouter from "./routers/ProductRouter";
import userRouter from "./routers/UserRouter";
import loginRouter from "./routers/LoginRouter";

const { dbConnection } = require('./mongo')

const app: Application = express();

const port = 5000;

app.use(cors());
app.use(bp.json());

dbConnection();

//use (añadir las nuevas url)
app.use("/product", productRouter)
//app.use("/user", userRouter)
app.use("/login", loginRouter)

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});
