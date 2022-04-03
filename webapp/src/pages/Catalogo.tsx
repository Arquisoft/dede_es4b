import React, {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { isLogeado } from '../App';

export interface producto {
    ids: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

const Catalogo = () => {
    const [productos, setProductos] = useState<producto[]>([]);

    const getProductos = async () => {
        const respuesta = await fetch('http://localhost:5000/product/list');

        setProductos(await respuesta.json());
    }

    useEffect(() => {
        getProductos();
    }, [])

    if (isLogeado())
        console.log("conectado");
    

    return (
        <>
            <NavBar/>
            <ProductosCatalogo productos={productos}/>
        </>
    );
}

export default Catalogo;