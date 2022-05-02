import {Request, Response, NextFunction} from "express";


const Product = require('../models/product')
const User = require('../models/user')
const Order = require('../models/order')

const existsProducts = async (req: Request, res: Response, next: NextFunction) => {

    let products = req.body.products

    if(products){
        await products.forEach(function (item: any){

            try {

                const product = Product.findById(item.id)

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

        })
    }

    next()

}

const existsOrder = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const order = await Order.findById(req.params.id)

        if(!order){
            return res.status(401).json({
                msg: 'El pedido no existe'
            })
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Id no válida'
        })
    }


    next()

}

const existsClient = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const client = await User.find({userName: req.body.client})

        if(!client){
            return res.status(401).json({
                msg: 'El cliente no existe'
            })
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Cliente no válido'
        })
    }


    next()

}

const existsClientParam = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const client = await User.find({userName: req.params.userName})

        if(!client){
            return res.status(401).json({
                msg: 'El cliente no existe'
            })
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Cliente no válido'
        })
    }


    next()

}


module.exports = {
    existsProducts,
    existsClient,
    existsClientParam,
    existsOrder
}