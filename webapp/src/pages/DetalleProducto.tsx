import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/AppBar/NavBar';
import { getProductoByID } from '../api/api';
import { añadirAlCarrito } from '../util/carrito';
import { Producto } from '../shared/shareddtypes';
import Cargando from '../components/Cargando/Cargando';

const DetalleProducto = () => {
    const params = useParams();
    const [product, setProduct] = useState<Producto>();
    const [cargando, setCargando] = useState(false);
    const [cargandoTexto] = useState("Cargando detalles");

    const getProduct = async () => {
        setCargando(true);
        await getProductoByID(params.id!)
            .then(data => {
                setProduct(data.product);
            }).finally(() => setCargando(false));

    }

    useEffect(() => {
        getProduct();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div >
            <header>
                <NavBar />
            </header>
            {
                cargando ?
                    <Cargando cargando={cargando} cargandoTexto={cargandoTexto} /> :

                    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div >
                            <img src={product?.image} alt="Imagen producto" />
                        </div>
                        <div>
                            <h1 className="text-purple-400 font-bold text-3xl">{product?.name}</h1>
                            <br />
                            <p className="text-base text-gray-900">
                                {product?.short_description}
                            </p>
                            <br />
                            <p className="text-base text-gray-900">
                                Talla: {product?.size}
                            </p>
                            <p className="text-base text-gray-900">
                                Color: {product?.color}
                            </p>
                            <p className="text-base text-gray-900">
                                Precio: {product?.price} €
                            </p>
                            <br />

                            <p className="text-base text-gray-900">
                                {product?.long_description}
                            </p>
                            <br />
                            <div className="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                <button onClick={() => añadirAlCarrito(product!)}>
                                    Añadir a carrito
                                </button>
                            </div>

                        </div>
                    </div>
            }
        </div>

    )
}

export default DetalleProducto;