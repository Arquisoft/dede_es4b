import {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import {Pagination} from "@mui/material";
import { getProductosPagina } from '../api/api';
import { Producto } from '../shared/shareddtypes';

const Catalogo = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);

    

    const handleChange = async (event:any, value:any) => {
        setNumbPage(value-1);
        await getProductos();
    };

    const getProductos = async () => {
        const respuesta = await getProductosPagina(numbPage);
        setMaxNumberPage(respuesta.maxPages);
        setProductos(respuesta.products);
    }

    useEffect(() => {
        getProductos();
    }, [numbPage, maxNumberPage])
    
    return (
        <>
            <NavBar/>
            <ProductosCatalogo productos={productos}/>
            
            <Pagination onChange={handleChange} color="secondary"  count={maxNumberPage} shape="rounded" />

        </>
    );
}

export default Catalogo;