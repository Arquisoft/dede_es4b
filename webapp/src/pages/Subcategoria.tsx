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

    const getProductos = async (n: number) => {
        setCargando(true);
        const subcategoria = params.sub_category?.charAt(0).toUpperCase()! + params.sub_category?.slice(1)!;
        const respuesta = await fetch("http://localhost:5000/product/list/sub_category/" + subcategoria + "/" + n);
        const respuestaJson = await respuesta.json();
        setMaxNumberPage(respuestaJson.maxPages);
        setProductos(respuestaJson.products);
        setCargando(false);
    }

    const handleChange = async (value: number) => {
        setNumbPage(value);
        await getProductos(numbPage);
    };

    useEffect(() => {
        getProductos(numbPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numbPage, maxNumberPage, params])

    return (
        <div className="ropa">
            <NavBar />
            {
                cargando ? 
                <Cargando cargando={cargando} cargandoTexto={cargandoTexto} /> : <ProductosCatalogo productos={productos} />
            }
            <Paginacion onChange={handleChange} maxPages={maxNumberPage} />
        </div>
    )
}

export default SubcategoriaRopa;