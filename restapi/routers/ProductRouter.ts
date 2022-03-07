import express, { Router } from 'express';
import {check} from 'express-validator';
import * as productController from "./../controladores/ProductController";

const routerProduct:Router = express.Router();

//routers
routerProduct.get(
    "/list",
    productController.findAllProducts
);

routerProduct.get(
  "/find/:id",
  productController.findAllProducts
);

routerProduct.delete(
  "/delete/:id",
  productController.findAllProducts
);

routerProduct.post(
  "/update/:id",[
    //validaciones controlador
    TODO
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  productController.findAllProducts
);

routerProduct.post(
  "/add",[
    //validaciones controlador
    TODO
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  productController.addProduct
);

export default routerProduct;