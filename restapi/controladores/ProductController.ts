import { Request, Response } from 'express';
const Product = require('../models/product')

//funciones
const findAllProducts = async (req: Request, res: Response) => {

  //llamada al repositorio
  const products = await Product.find()
  
  return res.status(200).send(products);
  
}

const findProduct = async (req: Request, res: Response) => {

  const product = await Product.find(req.params.id)
  
  return res.status(200).send(product);

}

const deleteProduct = async (req: Request, res: Response) => {

  const updatedFields = {
    status: false
  }
  //llamada al respositorio
  await Product.findByIdAndUpdate(req.params.id,updatedFields)

  return res.status(200).send({msg:"Producto eliminado"});
  
}

const updateProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  //creamos nuevo producto
  const product = new Product({
    name:req.params.name,
    section:req.params.section,
    description:req.params.description,
    price:req.params.price,
    image:req.params.image 
  });

  //lo actualizamos
  try{
    await Product.findByIdAndUpdate(req.params.id, product)
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
    name:req.params.name,
    section:req.params.section,
    description:req.params.description,
    price:req.params.price,
    image:req.params.image 
  });

  //lo guardamos
  try{
    await product.save
    return res.status(200).send(product);
  } catch (e){
    console.log(e);
    res.status(400).send({msg:"Producto añadido"});
  }
}

module.exports = {
  addProduct,
  findAllProducts,
  findProduct,
  updateProduct,
  deleteProduct
}