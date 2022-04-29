import { useState, useEffect } from 'react';
import NavBar from '../components/AppBar/NavBar';
import { Producto } from '../shared/shareddtypes';
import ProductosCatalogo from '../components/ProductosCatalogo/ProductosCatalogo';
import Pagination from '@mui/material/Pagination';

const SubcategoriaCalzado = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);

    const getProductos = async () => {
        const respuesta = await fetch("http://localhost:5000/product/list/sub_category/Calzado/1");
        const respuestaJson = await respuesta.json();
        setMaxNumberPage(respuestaJson.maxPages);
        setProductos(respuestaJson.products);
    }

    const handleChange = async (event:any, value:any) => {
        setNumbPage(value-1);
        await getProductos();
    };

    useEffect(() => {
        getProductos();
    }, [numbPage, maxNumberPage])

    return (
        <div className="ropa">
            <NavBar />
            <ProductosCatalogo productos={productos}/>
            <Pagination onChange={handleChange} color="secondary"  count={maxNumberPage} shape="rounded" />
        </div>
    )
}

export default SubcategoriaCalzado;