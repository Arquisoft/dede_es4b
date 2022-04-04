import {NextFunction, Request, Response} from "express";
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const exitsUser = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(401).json({
                msg: 'El usuario no existe'
            })
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Id no válida'
        })
    }


    next()

}

const hasAutorization = async (req: Request, res: Response, next: NextFunction) => {

    const authori = req.header('authorization');

    if (!authori) {
        return res.status(401).send({message: 'The request dont have an authorization header.'});
    }

    const token = authori.split('/')[1]

    if( !token ) {
        return res.status(401).json({
            msg: 'Request has no token'
        })
    }

    try {

        const { id, role } = jwt.verify(token, process.env.SECRET)

        const user = await User.findById( id )

        if(!user){
            return res.status(401).json({
                msg: 'El usuario no existe'
            })
        }

        if(user.role != "admin"){
            return res.status(401).json({
                msg: 'El usuario no tiene autorización'
            })
        }

        res.locals.user = user;

    } catch (error) {
        return res.status(401).json({
            msg: 'Token inválido'
        })
    }

    next()

}

module.exports = {
    exitsUser,
    hasAutorization
}