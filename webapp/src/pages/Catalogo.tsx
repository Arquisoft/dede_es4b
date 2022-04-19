import React, {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { isLogeado } from '../App';
import {Pagination} from "@mui/material";
import useStyles from '../components/ProductosCatalogo/styles';

export interface producto {
    _id: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

const Catalogo = () => {
    const [productos, setProductos] = useState<producto[]>([]);


    const getProductos = async () => {
        const respuesta = await fetch('http://localhost:5000/product/list/0');

        setProductos(await respuesta.json());
    }

    useEffect(() => {
        getProductos();
    }, [])

    if (isLogeado())
        console.log("conectado");
    
   const p = async () => {

        const respuesta = await fetch('http://localhost:5000/product/list/1');
        setProductos(await respuesta.json());
    }
    const classes = useStyles();

    return (
        <>
            <NavBar/>
            <ProductosCatalogo productos={productos}/>
            <Pagination className={classes.paginacion} onClick={() => p()} count={10} shape="rounded" />

        </>
    );
}

export default Catalogo;