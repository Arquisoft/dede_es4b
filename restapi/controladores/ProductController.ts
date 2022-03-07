import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const routerProduct:Router = express.Router()

//funciones
export let findAllProducts = async (req: Request, res: Response) => {
  //llamada al respositorio
  try{
    await ProductRepository.findAllProducts()
            .then(products => {
              return res.status(200).send(products);
            });
  } catch (e){
    console.log(e);
    res.send({"error": "error en tu petición"});
  }
  
}

export let findProduct = async (req: Request, res: Response) => {
  //llamada al respositorio
  try{
    await ProductRepository.findProduct(req.params.id)
            .then(product => {
              return res.status(200).send(product);
            });
  } catch (e){
    console.log(e);
    res.send({"error": "error en tu petición"});
  }
  
}

export let deleteProduct = async (req: Request, res: Response) => {
  //llamada al respositorio
  try{
    await ProductRepository.deleteProduct(req.params.id)
            .then(result => {
              return res.status(200).send(result);
            });
  } catch (e){
    console.log(e);
    res.send({"error": "error en tu petición"});
  }
  
}

export let updateProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  //creamos nuevo producto
  const product = new Product({
    
  });

  //lo actualizamos
  try{
    await ProductRepository.addProduct(req.params.id, product)
            .then( result => {
              return res.status(200).send(result);
            });
  } catch (e){
    console.log(e);
    res.send({"error": "error en tu petición"});
  }
}

export let addProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  //creamos nuevo producto
  const product = new Product({
    
  });

  //lo guardamos
  try{
    await ProductRepository.addProduct(product)
            .then( result => {
              return res.status(200).send(result);
            });
  } catch (e){
    console.log(e);
    res.send({"error": "error en tu petición"});
  }
}
