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
    const[value, setValue] = useState('');
    

    const handleChange = async (event:any, value:any) => {
        setNumbPage(value-1);
        await getProductos();
    };

    const getProductos = async () => {
        const respuesta = await getProductosPagina(numbPage);
        setMaxNumberPage(respuesta.maxPages);
        setProductos(respuesta.products);
    }

    const keyDownHandler = async (event: any) => {
        if (event.code === "Enter") {
            //setValue(event.target.value);
            console.log(value);
            const respuesta = await fetch("http://localhost:5000/product/list/search/" + event.target.value + "/" + 0);
            const respuestaJson = await respuesta.json();
            console.log(respuestaJson);
            setMaxNumberPage(respuestaJson.maxPages);
            setProductos(respuestaJson.products);
            console.log(productos);
        }
      };

    useEffect(() => {
        getProductos();
    }, [numbPage, maxNumberPage])
    
    return (
        <>
            <NavBar/>
            <div id="barra-busqueda">
                <input 
                    className="w-96 h-12 ml-2 mt-2 items-center justify-center px-4 py-2 border border-black rounded-md shadow-sm text-base font-medium "
                    type="text" 
                    placeholder="Busca un producto..."
                    onKeyDown={keyDownHandler} />
            </div>
            <ProductosCatalogo productos={productos}/>
            
            <Pagination onChange={handleChange} color="secondary"  count={maxNumberPage} shape="rounded" />

        </>
    );
}

export default Catalogo;