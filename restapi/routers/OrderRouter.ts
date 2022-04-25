import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("../validadores/validador");

const {
    existsClient,
    existsClientParam,
    existsProducts,
    existsOrder
} = require("../validadores/OrderValidator");

const {
  addOrder,
  findAllOrders,
  findOrder,
  findOrderByClient,
  updateOrder,
  deleteOrder
} = require("./../controladores/OrderController")

const routerOrder:Router = express.Router();

//routers
routerOrder.get(
  "/list",
  findAllOrders
);

routerOrder.get(
  "/find/:id",
  [
      existsOrder,
      validateFields
  ],
  findOrder,

);

routerOrder.get(
    "/findByClient/:userName",
    [
        existsClientParam,
        validateFields
    ],
    findOrderByClient,

);

routerOrder.delete(
  "/delete/:id",
  [
      existsOrder,
      validateFields
  ],
  deleteOrder
);

routerOrder.post(
  "/add"
    ,[
    existsClient,
    existsProducts,
    validateFields
  ],
  
  addOrder
);

routerOrder.put(
  "/update/:id",[
    existsOrder,
    existsClient,
    existsProducts,
    validateFields
  ],
  updateOrder
);


export default routerOrder;