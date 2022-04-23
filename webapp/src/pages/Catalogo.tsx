import React, {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { isLogeado } from '../App';
import { getProductos } from '../api/api';
import { Producto } from '../shared/shareddtypes';

const Catalogo = () => {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        getProductos().then(productos => setProductos(productos))
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