import { useState, useEffect } from 'react';
import NavBar from '../components/AppBar/NavBar';
import { Producto } from '../shared/shareddtypes';
import ProductosCatalogo from '../components/ProductosCatalogo/ProductosCatalogo';
import { useParams } from 'react-router-dom';
import Paginacion from '../components/Paginacion/Paginacion';
import Cargando from '../components/Cargando/Cargando';

const SubcategoriaRopa = () => {
    const params = useParams();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);
    const [cargando, setCargando] = useState(false);
    const [cargandoTexto] = useState("Cargando productos");

    const getProductos = async (numbPage: number) => {
        setCargando(true);
        const subcategoria = params.sub_category?.charAt(0).toUpperCase()! + params.sub_category?.slice(1)!;
        const respuesta = await fetch("http://localhost:5000/product/list/sub_category/" + subcategoria + "/" + numbPage);
        const respuestaJson = await respuesta.json();
        setMaxNumberPage(respuestaJson.maxPages);
        setProductos(respuestaJson.products);
        setCargando(false);
    }

    const handleChange = async (value: number) => {
        setNumbPage(value);
        await getProductos(numbPage);
    };

    const keyDownHandler = async (event: any) => {
        if (event.code === "Enter") {
            //setValue(event.target.value);
            const respuesta = await fetch("http://localhost:5000/product/list/search/" + event.target.value + "/" + 0);
            const respuestaJson = await respuesta.json();
            setMaxNumberPage(respuestaJson.maxPages);
            setProductos(respuestaJson.products);
        }
    };

    const checkEmpty = async (event: any) => {
        if (event.target.value == "") {
           getProductos(numbPage);
        }
    };

    useEffect(() => {
        getProductos(numbPage);
    }, [numbPage, maxNumberPage, params])

    return (
        <div className="ropa">
            <NavBar />
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
            <Paginacion onChange={handleChange} maxPages={maxNumberPage} />
        </div>
    )
}

export default SubcategoriaRopa;