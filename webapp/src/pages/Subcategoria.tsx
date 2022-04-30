import { useState, useEffect } from 'react';
import NavBar from '../components/AppBar/NavBar';
import { Producto } from '../shared/shareddtypes';
import ProductosCatalogo from '../components/ProductosCatalogo/ProductosCatalogo';
import { useParams } from 'react-router-dom';
import Paginacion from '../components/Paginacion/Paginacion';

const SubcategoriaRopa = () => {
    const params = useParams();
    console.log(params.sub_category)
    const [productos, setProductos] = useState<Producto[]>([]);
    const [numbPage, setNumbPage] = useState<number>(0);
    const [maxNumberPage, setMaxNumberPage] = useState<number>(0);

    const getProductos = async (numbPage : number) => {
        const subcategoria = params.sub_category?.charAt(0).toUpperCase()! + params.sub_category?.slice(1)!;
        const respuesta = await fetch("http://localhost:5000/product/list/sub_category/" + subcategoria + "/" + numbPage);
        const respuestaJson = await respuesta.json();
        setMaxNumberPage(respuestaJson.maxPages);
        setProductos(respuestaJson.products);
    }

    const handleChange = async (value:any) => {
        setNumbPage(value-1);
        await getProductos(numbPage);
    };

    useEffect(() => {
        getProductos(numbPage);
    }, [numbPage, maxNumberPage, params])

    return (
        <div className="ropa">
            <NavBar />
            <ProductosCatalogo productos={productos}/>
            <Paginacion onChange={handleChange}  maxPages={maxNumberPage} />
        </div>
    )
}

export default SubcategoriaRopa;