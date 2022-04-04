import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("../validadores/validador");

const {
    exitsUser,
    hasAutorization
} = require("../validadores/UserValidator");

const {
  register,
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
  "/delete/:id",[
      exitsUser,
      hasAutorization
  ],
  deleteUser
);

routerUser.post(
  "/register"
    ,[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('surname').isLength({ min: 1 }).trim().escape(),
    check('userName').isLength({ min: 1 }).trim().escape(),
    validateFields
  ],
  register
);

routerUser.put(
  "/update/:id",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('surname').isLength({ min: 1 }).trim().escape(),
    exitsUser,
    validateFields
  ],
  updateUser
);

export default routerUser;