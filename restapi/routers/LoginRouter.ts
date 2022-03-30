import express, { Router } from 'express';

const {login} = require("./../controladores/LoginController");


const routerLogin:Router = express.Router();

//routers
routerLogin.post(
  '/',
  login
)

export default routerLogin;