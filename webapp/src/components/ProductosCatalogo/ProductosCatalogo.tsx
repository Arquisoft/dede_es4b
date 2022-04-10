import React, {useEffect, useState } from 'react';
import ProductoCatalogo from './ProductoCatalogo/ProductoCatalogo';
import { Producto } from '../../shared/shareddtypes';
import MenuOrdenarProductos from './MenuOrdenarProductos/MenuOrdenarProductos';
import Paginacion from '../Paginacion/Paginacion';



const ProductosCatalogo = ({ productos }: { productos: Producto[] }) => {

    const [actualizado, setActualizado] = useState(false);

    useEffect(() => {
        setActualizado(true);
    }, [actualizado])


    return (
        <div id="Catalogo" className='grid'>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Catálogo de productos</h2>

            <div id='productos' className="order-2 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {productos.map((producto) => (
                    <ProductoCatalogo key={producto._id} producto={producto} />
                ))}
            </div>

            <div className='flex justify-end order-1'>
                <MenuOrdenarProductos productos={productos} setActualizado={setActualizado} />
            </div>

            <div className='order-3'>
                <Paginacion />
            </div>
        </div>
    );
}

export default ProductosCatalogo;