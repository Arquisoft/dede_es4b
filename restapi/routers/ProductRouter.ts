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
    //validaciones controlador
    TODO
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    validador
  ],
  updateProduct
);

routerProduct.post(
  "/add",[
    //validaciones controlador
    TODO
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    validador
  ],
  addProduct
);

export default routerProduct;