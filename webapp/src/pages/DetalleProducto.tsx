import React, { useState } from 'react';
import { useEffect } from 'react';
import { producto } from './Catalogo';

const DetalleProducto = (props : any) => {

    const [product, setProduct] = useState<producto[]>([]);

    const productId = props.match.params.productId;

    const getProduct = async () => {
        const respuesta = await fetch('http://localhost:5000/product/list/' + productId)

        setProduct(await respuesta.json());
    }

    

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <div>
            Detalle
        </div>
    )
}

export default DetalleProducto