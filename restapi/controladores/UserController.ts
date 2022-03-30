import { Request, Response } from 'express';
const User = require('../models/user');
const bcrypt = require('bcrypt');

//funciones
const findAllUser = async (req: Request, res: Response) => {

  //llamada al repositorio
  const users = await User.find()
  
  return res.status(200).send(users);
  
}

const findUser = async (req: Request, res: Response) => {

  const user = await User.findById(req.params.id)
  
  return res.status(200).send(user);

}

const deleteUser = async (req: Request, res: Response) => {

  //llamada al respositorio
  await User.findByIdAndDelete(req.params.id)

  return res.status(200).send({msg:"Usuario eliminado"});
  
}

const updateUser = async (req: Request, res: Response) => {

  const { id } = req.params

  const {_id,userName,password, ...other} = req.body

  //lo actualizamos
  try{
    await User.findByIdAndUpdate(id, other)
    return res.status(200).send({msg:"Usuario actualizado"});
  } catch (e){
    console.log(e);
    res.status(400).send({msg: e});
  }
}

const register = async (req: Request, res: Response) => {

  const userData = req.body;

  //creamos nuevo producto
  const user = new User({
    name:userData.name,
    surname:userData.surname,
    userName:userData.userName,
  });

  //Hash password
  const saltRounds = Number(process.env.SECRET_SALT)

  const passwordHash = await bcrypt.hash(userData.password, saltRounds)

  user.password = passwordHash

  //lo guardamos
  try{
    await user.save()
    return res.status(200).send(user);
  } catch (e){
    console.log(e);
    res.status(400).send({msg:"Usuario no añadido"});
  }
}

module.exports = {
  register,
  findAllUser,
  findUser,
  updateUser,
  deleteUser
}