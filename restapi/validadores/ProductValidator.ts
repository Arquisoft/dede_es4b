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

const validPrice = (req: Request, res: Response, next: NextFunction) => {

    let value = parseFloat(req.body.price)

    if( value <= 0 ){
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

module.exports = {
    exitsProduct,
    validPrice,
    validSize
}