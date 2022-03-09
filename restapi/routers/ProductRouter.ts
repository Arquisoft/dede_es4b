import express, { Router } from 'express';
import {check} from 'express-validator';

const {
  addProduct,
  findAllProducts,
  findProduct,
  updateProduct,
  deleteProduct
} = require("./../controladores/ProductController")

const routerProduct:Router = express.Router();
const {validador} = require("./../validadores/validador.js");

//routers
routerProduct.get(
  "/list",
  findAllProducts
);

routerProduct.get(
  "/find/:id",
  findProduct
);

routerProduct.delete(
  "/delete/:id",
  deleteProduct
);

routerProduct.put(
  "/update/:id",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('section').isLength({ min: 1 }).trim().escape(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validador
  ],
  updateProduct
);

routerProduct.post(
  "/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('section').isLength({ min: 1 }).trim().escape(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validador
  ],
  addProduct
);

export default routerProduct;