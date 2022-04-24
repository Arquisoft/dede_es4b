import React, {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { isLogeado } from '../App';
import {Pagination,Typography} from "@mui/material";
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
    const [productosPagina, setProductosPagina] = useState<producto[]>([]);
    

    const handleChange = async (event:any, value:any) => {
        const respuesta = await fetch('http://localhost:5000/product/list/'+(value-1));
        setProductosPagina(await respuesta.json());
    };

    const getProductosPagina = async () => {
        const respuesta = await fetch('http://localhost:5000/product/list/0');
        setProductosPagina(await respuesta.json());
    }

    const getProductos = async () => {
        const respuesta = await fetch('http://localhost:5000/product/list');

        setProductos(await respuesta.json());
    }

    useEffect(() => {
        getProductosPagina();
        getProductos();
    }, [])

    if (isLogeado())
        console.log("conectado");
    
    console.log(productos);
    const classes = useStyles();
    let longitud=productos.length/6;
    return (
        <>
            <NavBar/>
            <ProductosCatalogo productos={productosPagina}/>
            
            <Pagination className={classes.paginacion} onChange={handleChange} color="secondary"  count={Math.round(longitud)} shape="rounded" />

        </>
    );
}

export default Catalogo;