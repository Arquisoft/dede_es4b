import { Request, Response } from 'express';
const Order = require('../models/order')

//funciones
const findAllOrders = async (req: Request, res: Response) => {

  //llamada al repositorio
  const orders = await Order.find()
  
  return res.status(200).send(orders);
  
}

const findOrder = async (req: Request, res: Response) => {

  const order = await Order.findById(req.params.id)
  
  return res.status(200).send(order);

}

const findOrderByClient = async (req: Request, res: Response) => {

  const order = await Order.find({user: req.params.userName})

  return res.status(200).send(order);

}

const deleteOrder = async (req: Request, res: Response) => {

  //llamada al respositorio
  await Order.findByIdAndDelete(req.params.id)

  return res.status(200).send({msg:"Pedido eliminado"});
  
}

const updateOrder = async (req: Request, res: Response) => {

  const { id } = req.params

  const {_id,user, ...other} = req.body

  //lo actualizamos
  try{
    await Order.findByIdAndUpdate(id, other)
    return res.status(200).send({msg:"Pedido actualizado"});
  } catch (e){
    console.log(e);
    res.status(400).send({msg: e});
  }
}

const addOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  //creamos nuevo producto
  const order = new Order({
    user:orderData.user,
    products: orderData.products,
    order_date: orderData.order_date,
    status: orderData.status,
    shipping_address: orderData.shipping_address
  });

  //lo guardamos
  try{
    await order.save()
    return res.status(200).send(order);
  } catch (e){
    console.log(e);
    res.status(400).send({msg:"Pedido no añadido"});
  }
}

module.exports = {
  addOrder,
  findAllOrders,
  findOrder,
  findOrderByClient,
  updateOrder,
  deleteOrder
}