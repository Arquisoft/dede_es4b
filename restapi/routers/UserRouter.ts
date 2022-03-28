import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("./../validadores/validador");

const {
  addUser,
  findAllUser,
  findUser,
  updateUser,
  deleteUser
} = require("./../controladores/UserController")

const routerUser:Router = express.Router();

//routers
routerUser.get(
  "/list",
  findAllUser
);

routerUser.get(
  "/find/:id",
  findUser
);

routerUser.delete(
  "/delete/:id",
  deleteUser
);

routerUser.post(
  "/add"
    ,[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('surname').isLength({ min: 1 }).trim().escape(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validateFields
  ],
  
  addUser
);

routerUser.put(
  "/update/:id",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('section').isLength({ min: 1 }).trim().escape(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validateFields
  ],
  updateUser
);

export default routerUser;