import {Request, Response, NextFunction} from "express";

const Product = require('../models/product')

const exitsProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(401).json({
                msg: 'El producto no existe'
            })
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Id no válida'
        })
    }


    next()

}

const existsSubcategory = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const subcategorys = await Product.find().distinct("sub_category")

        if(!subcategorys.includes(req.params.sub_category)){
            return res.status(401).json({
                msg: 'La subcategoría no existe'
            })
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Subcategoría no válida'
        })
    }


    next()

}

const existsFilter = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if (req.params.filter === "sub_category"){
            try {

                const subcategorys = await Product.find().distinct("sub_category")

                if(!subcategorys.includes(req.params.search)){
                    return res.status(401).json({
                        msg: 'La subcategoría no existe'
                    })
                }

            } catch (error) {
                return res.status(401).json({
                    msg: 'Subcategoría no válida'
                })
            }
        } else if (req.params.filter === "search"){
            if (req.params.search === null || req.params.search === "undefined"){
                return res.status(401).json({
                    msg: 'Busqueda no válida'
                })
            }
        } else {
            return res.status(401).json({
                msg: 'Filtro no existente'
            })
        }

    }catch (e){
        return res.status(401).json({
            msg: 'Error al hacer la búsqueda'
        })
    }

    next()

}

const existsProductNameSize = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const products = await Product.find({name: req.params.name})

        if(products.length == 0){
            return res.status(401).json({
                msg: 'No existe un producto con ese nombre'
            })
        }

        const size = await Product.find().distinct("size")

        if(!size.includes(req.params.size)){
            return res.status(401).json({
                msg: 'La talla no existe'
            })
        }


    } catch (error) {
        return res.status(401).json({
            msg: 'Name o size no válido'
        })
    }


    next()

}

const validPrice = (req: Request, res: Response, next: NextFunction) => {

    let value = parseFloat(req.body.price)

    if(value && value <= 0){
        return res.status(401).json({
            msg: 'El precio no puede ser negativo'
        })
    }

    next()

}

const validSize = (req: Request, res: Response, next: NextFunction) => {

    let value = parseFloat(req.body.size)

    if( value && value <= 0 ){
        return res.status(401).json({
            msg: 'El tamaño no puede ser negativo'
        })
    }

    next()

}

const validPage = (req: Request, res: Response, next: NextFunction) => {

    let page = parseInt(req.params.page)

    if( page < 0 ){
        return res.status(401).json({
            msg: 'Página no válida'
        })
    }

    next()

}

module.exports = {
    exitsProduct,
    validPrice,
    validSize,
    validPage,
    existsSubcategory,
    existsProductNameSize,
    existsFilter
}