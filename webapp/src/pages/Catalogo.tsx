import {useState} from 'react';
import ProductosCatalogo from "../components/ProductosCatalogo/ProductosCatalogo";
import NavBar from "../components/AppBar/NavBar";
import { getProductosPagina, searchProductos } from '../api/api';
import { Producto } from '../shared/shareddtypes';
import Paginacion from '../components/Paginacion/Paginacion';
import Cargando from '../components/Cargando/Cargando';

const Catalogo = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);
    const [cargando, setCargando] = useState(false);
    const [cargandoTexto] = useState("Cargando productos");

    const handleChange = async ( value : number) => {
        setNumbPage(value);
        setCargando(true);
        const respuesta = await getProductosPagina(value);
        setMaxNumberPage(respuesta.maxPages);
        setProductos(respuesta.products);
        setCargando(false);
    };


    const getProductos = async () => {
        setCargando(true);
        const respuesta = await getProductosPagina(numbPage);
        setMaxNumberPage(respuesta.maxPages);
        setProductos(respuesta.products);
        setCargando(false);

    }

    const keyDownHandler = async (event: any) => {
        if (event.code === "Enter") {
            const respuesta = await searchProductos(event.target.value);
            //const respuestaJson = await respuesta.json();
            setMaxNumberPage(respuesta.maxPages);
            setProductos(respuesta.products);
        }
      };

    const checkEmpty = async (event: any) => {
        if (event.target.value === "") {
            getProductos();
        }
    };

    return (
        <>
            <NavBar/>
            <div id="barra-busqueda">
                <input 
                    className="w-96 h-12 ml-2 mt-2 items-center justify-center px-4 py-2 border border-black rounded-md shadow-sm text-base font-medium "
                    type="text" 
                    placeholder="Busca un producto..."
                    onKeyDown={keyDownHandler}
                    onChange={checkEmpty}/>
            </div>
            
            {
                cargando ? 
                <Cargando cargando={cargando} cargandoTexto={cargandoTexto} /> : <ProductosCatalogo productos={productos} />
            }
            <Paginacion onChange={handleChange} maxPages={maxNumberPage}/>

        </>
    );
}

export default Catalogo;