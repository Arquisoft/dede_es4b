import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("../validadores/validador");

const {
    exitsProduct,
    validPrice,
    validSize
} = require("../validadores/ProductValidator");

const {
  addProduct,
  findAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  calculateShippementCost,
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
  findProduct,
  exitsProduct
);

routerProduct.delete(
  "/delete/:id",
  validPrice,
  exitsProduct,
  deleteProduct
);

routerProduct.post(
  "/add"
    ,[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('short_description').isLength({ min: 1 }).trim().escape(),
    check('long_description').isLength({ min: 1 }).trim().escape(),
    check('brand').isLength({ min: 1 }).trim().escape(),
    check('category').isLength({ min: 1 }).trim().escape(),
    check('sub_category').isLength({ min: 1 }).trim().escape(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validPrice,
    validSize,
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
    validPrice,
    exitsProduct,
    validateFields
  ],
  updateProduct
);

routerProduct.post(
    "/shippementCost"
    ,

    calculateShippementCost
);

export default routerProduct;