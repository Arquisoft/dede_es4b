import { Request, Response } from 'express';
const Product = require('../models/product')
const CalculateShippingCost = require('../costes_envio_api/calcular_costes_envio')

//axuiliar functions
//filtra los productos de un array para que no se repitan varios con un mismo nombre
const filterProductsByName = (products: any): any => {
  const seen = new Set();
  const result = products.filter((p: any) => {
    const duplicate = seen.has(p.name);
    seen.add(p.name);
    return !duplicate;
  });
  return result
}

const nElementos = 8;

//da la paginación de un array dado
const filterProductsByPage = (products: any, page:any): any => {
  let limite = nElementos;

  let desde = Number(page) * nElementos;

  const filteredProducts = filterProductsByName(products)

  let pages = filteredProducts.length / limite

  if(pages > ~~(filteredProducts.length / limite)){
    pages = ~~(filteredProducts.length / limite) + 1;
  }

  const result = {
    products: filteredProducts.slice(desde, desde + limite),
    maxPages: pages
  }

  return result;
}

//funciones
const findAllProducts = async (req: Request, res: Response) => {

  //llamada al repositorio
  const products = await Product.find()

  const filteredProducts = filterProductsByName(products)

  return res.status(200).json(filteredProducts);
  
}

const filterProducts = async (req: Request, res: Response) => {

  if (req.params.filter === "sub_category"){
    //llamada al repositorio
    const products = await Product.find({sub_category: req.params.search})

    const filteredProducts = filterProductsByName(products)

    return res.status(200).send(filterProductsByPage(filteredProducts,req.params.page));

  } else if (req.params.filter === "search"){

    const products = await Product.find()

    const filteredProducts = filterProductsByName(products)
    let resultProducts: Array<any> = [];
    if(req.params.search.trim() === ""){
      resultProducts = filteredProducts;
    } else {
      filteredProducts.forEach(function (item: any){
        if(item.name.toLowerCase().trim().startsWith(req.params.search.toLowerCase().trim())){
          resultProducts.push(item);
        }
      })
    }

    return res.status(200).send(filterProductsByPage(resultProducts,req.params.page));

  } else {
    return res.status(401).json({
      msg: 'Filtro no existente'
    })
  }


}

/*
const filterProductsBySubCategory = async (req: Request, res: Response) => {

  //llamada al repositorio
  const products = await Product.find({sub_category: req.params.sub_category})

  const filteredProducts = filterProductsByName(products)

  return res.status(200).json(filteredProducts);

}

const filterProductsByString = async (req: Request, res: Response) => {

  //llamada al repositorio
  const products = await Product.find()

  const filteredProducts = filterProductsByName(products)

  let resultProducts: Array<any> = [];
  filteredProducts.forEach(function (item: any){
    if(item.name.toLowerCase().startsWith(req.params.search.toLowerCase())){
      resultProducts.push(item);
    }
  })

  return res.status(200).json(resultProducts);

}

 */

const findByPage = async (req: Request, res: Response) => {

  const products = await Product.find()

  const filteredProducts = filterProductsByName(products)

  return res.status(200).send(filterProductsByPage(filteredProducts,req.params.page));

}

const findProduct = async (req: Request, res: Response) => {

  const product = await Product.findById(req.params.id)

  const sizes = await Product.find({name: product.name}).distinct("size")

  const result = {
    product: product,
    sizes: sizes,
  }
  return res.status(200).send(result);

}

const findProductSize = async (req: Request, res: Response) => {

  //llamada al repositorio
  const product = await Product.find({name: req.params.name, size: req.params.size})

  const sizes = await Product.find({name: req.params.name}).distinct("size")

  const result = {
    product: product,
    sizes: sizes,
  }

  return res.status(200).send(result);

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
    shippementCost = await CalculateShippingCost(addressTo)

    return res.status(200).send({coste: shippementCost});
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
  calculateShippementCost,
  //filterProductsBySubCategory,
  //filterProductsByString,
  findProductSize,
  filterProducts
}