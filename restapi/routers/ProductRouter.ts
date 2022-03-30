import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("../validadores/validador");

const {
  addProduct,
  findAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  findByPage
} = require("./../controladores/ProductController")

const routerProduct:Router = express.Router();

//routers
routerProduct.get(
  "/list",
  findAllProducts
);

routerProduct.get(
    "/list/:page",
    findByPage
);

routerProduct.get(
  "/find/:id",
  findProduct
);

routerProduct.delete(
  "/delete/:id",
  deleteProduct
);

routerProduct.post(
  "/add"
    ,[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('section').isLength({ min: 1 }).trim().escape(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validateFields
  ],
  
  addProduct
);

routerProduct.put(
  "/update/:id",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('section').isLength({ min: 1 }).trim().escape(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validateFields
  ],
  updateProduct
);

export default routerProduct;