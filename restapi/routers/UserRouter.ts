import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("../validadores/validador");

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
  "/delete/:id",
  deleteUser
);

routerUser.post(
  "/register"
    ,[
        //Todo
    validateFields
  ],
  register
);

routerUser.put(
  "/update/:id",[
        //Todo
    validateFields
  ],
  updateUser
);

export default routerUser;