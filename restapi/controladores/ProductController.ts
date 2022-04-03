import { Request, Response } from 'express';
const Product = require('../models/product')
const CalculateShippingCost = require('../costes_envio_api/calcular_costes_envio')

//funciones
const findAllProducts = async (req: Request, res: Response) => {

  //llamada al repositorio
  const products = await Product.find()
  
  return res.status(200).send(products);
  
}

const findByPage = async (req: Request, res: Response) => {

  let limite = 5;

  let desde = Number(req.params.page) * 5;

  const products = await Product.find(req.params.id)
      .limit(Number(limite))
      .skip(Number(desde))
      .catch((error: Error) => {
        console.log(error);
        res.status(400).send({msg: "Error al paginar los productos"});
      });

  return res.status(200).send(products);

}

const findProduct = async (req: Request, res: Response) => {

  const product = await Product.findById(req.params.id)
  
  return res.status(200).send(product);

}

const deleteProduct = async (req: Request, res: Response) => {

  //llamada al respositorio
  await Product.findByIdAndDelete(req.params.id)

  return res.status(200).send({msg:"Producto eliminado"});
  
}

const updateProduct = async (req: Request, res: Response) => {

  const { id } = req.params

  const {_id, ...other} = req.body

  //lo actualizamos
  try{
    await Product.findByIdAndUpdate(id, other)
    return res.status(200).send({msg:"Producto actualizado"});
  } catch (e){
    console.log(e);
    res.status(400).send({msg: e});
  }
}

const addProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  //creamos nuevo producto
  const product = new Product({
    name:productData.name,
    price:productData.price,
    short_description:productData.short_description,
    long_description:productData.long_description,
    brand:productData.brand,
    category:productData.category,
    sub_category:productData.sub_category,
    image:productData.image,

    type:productData.type,
    color:productData.color,
    size:productData.size
  });

  //lo guardamos
  try{
    await product.save()
    return res.status(200).send(product);
  } catch (e){
    console.log(e);
    res.status(400).send({msg:"Producto no añadido"});
  }
}

const calculateShippementCost = async (req: Request, res: Response) => {
  const addressTo = req.body;
  let shippementCost = -1;

  try{
    shippementCost = CalculateShippingCost(addressTo)
    return res.status(200).send(shippementCost);
  } catch (e){
    console.log(e);
    res.status(400).send({msg:"Fallo al calcular costes de envio"});
  }
}

module.exports = {
  addProduct,
  findAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  findByPage,
  calculateShippementCost
}