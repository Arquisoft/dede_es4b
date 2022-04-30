import {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { getProductosPagina } from '../api/api';
import { Producto } from '../shared/shareddtypes';
import Paginacion from '../components/Paginacion/Paginacion';

const Catalogo = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);

    

    const handleChange = async ( value:any) => {
        setNumbPage(value);
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
            
            <Paginacion onChange={handleChange} maxPages={maxNumberPage}/>

        </>
    );
}

export default Catalogo;