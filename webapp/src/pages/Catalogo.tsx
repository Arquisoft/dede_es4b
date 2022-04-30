import {useEffect, useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { getProductosPagina } from '../api/api';
import { Producto } from '../shared/shareddtypes';
import Paginacion from '../components/Paginacion/Paginacion';
import Cargando from '../components/Cargando/Cargando';

const Catalogo = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);
    const [cargando, setCargando] = useState(false);
    const [cargandoTexto] = useState("Cargando productos");
    

    const handleChange = async ( value:any) => {
        setNumbPage(value);
        await getProductos();
    };

    const getProductos = async () => {
        setCargando(true);
        const respuesta = await getProductosPagina(numbPage);
        setMaxNumberPage(respuesta.maxPages);
        setProductos(respuesta.products);
        setCargando(false);
    }

    useEffect(() => {
        getProductos();
    }, [numbPage, maxNumberPage])
    
    
    return (
        <>
            <NavBar/>
            {
                cargando ? 
                <Cargando cargando={cargando} cargandoTexto={cargandoTexto} /> : <ProductosCatalogo productos={productos} />
            }
            <Paginacion onChange={handleChange} maxPages={maxNumberPage}/>

        </>
    );
}

export default Catalogo;