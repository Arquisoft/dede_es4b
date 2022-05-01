import express, { Router } from 'express';
import {check} from "express-validator";

const {login} = require("./../controladores/LoginController");

const {validateFields} = require("../validadores/validador");

const routerLogin:Router = express.Router();

//routers
routerLogin.post(
  '/',
    [
        check('userName').isLength({ min: 1 }).trim().escape(),
        validateFields
    ],
  login
)

export default routerLogin;