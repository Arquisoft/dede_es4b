import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import ProductoCatalogo from './ProductoCatalogo/ProductoCatalogo';
import useStyles from './styles';

interface producto {
    ids: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

const ProductosCatalogo = () => {

    const [productos, setProductos] = useState<producto[]>([]);

    const getProductos = async (): Promise<producto[]> => {
        let respuesta = await fetch('http://localhost:3030/productos')

        return respuesta.json();
    }

    const refrescarProductos = async () => {
        let respuesta = await getProductos();

        setProductos(respuesta);
    }

    useEffect(() => {
        refrescarProductos();
    }, [])


    const classes = useStyles();
    return (
        <main className={classes.main}>
            <Grid container justifyContent="center" spacing={1}>
                {productos.map(product => (
                    <Grid item key={product.ids} xs={12} sm={6} md={4} lg={3}>
                        <ProductoCatalogo product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default ProductosCatalogo;