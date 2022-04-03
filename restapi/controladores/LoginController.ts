import { Request, Response } from 'express';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const User = require('../models/user')

//funciones
const login = async (req: Request, res: Response) => {

  const user = await User.findOne({'userName': req.body.userName})
  
  if(!user){

    res.status(401).json({ error: "invalid user or password" })
    
  } else {

    const samePassword = await bcrypt.compare(req.body.password, user.password)
    
    if(!samePassword){
      res.status(401).json({ error: "invalid user or password" })
    } else {

      const userToken = {
        id: user._id,
        userName: req.body.userName,
        role: user.role
      }
    
      const tokenSecret = process.env.SECRET
    
      const token = jwt.sign(userToken, tokenSecret)
    
      res.send({
        userName: user.userName,
        name: user.Name,
        token
      })

    }

  }

 
  
}

module.exports = {
  login,
}