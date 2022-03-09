import { Request, Response } from 'express';
const Product = require('../models/product')

//funciones
const findAllProducts = async (req: Request, res: Response) => {


  //llamada al repositorio
  await Product.findAllProducts().then(
          products => {
            return res.status(200).send(products);
          });
  
}

const findProduct = async (req: Request, res: Response) => {
  //llamada al respositorio
  await Product.findProduct(req.params.id).then(
          product => {
            return res.status(200).send(product);
          });
}

const deleteProduct = async (req: Request, res: Response) => {
  //llamada al respositorio
  await Product.deleteProduct(req.params.id)
  return res.status(200).send({msg:"Producto eliminado"});
  
}

const updateProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  //creamos nuevo producto
  const product = new Product({
    
  });

  //lo actualizamos
  try{
    await Product.addProduct(req.params.id, product)
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
    
  });

  //lo guardamos
  try{
    await Product.addProduct(product).then( 
            result => {
              return res.status(200).send(result);
            });
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