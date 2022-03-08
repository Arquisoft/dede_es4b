import React from 'react';
import {Grid} from '@material-ui/core';
import ProductoCatalogo from './ProductoCatalogo/ProductoCatalogo';
import useStyles from './styles';

const products = [
    {id: 1, name: "Shoes", description: "Running shoes", price: "139.99$", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/ebad848a-13b1-46d5-a85e-49b4b6a4953c/air-force-1-le-zapatillas-nino-a-D59pRJ.png"},
    {id: 2, name: "Mackbook", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"},
    {id: 3, name: "Bicicleta", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"},
    {id: 4, name: "WEDZE", description: "Pantalones de Esquí y Nieve Hombre Wedze Ski-P 100 Gris", price: "$5", image: "https://contents.mediadecathlon.com/p1860697/k$a1b0f607907069c6a4b7addaa3084784/sq/pantalones-de-esqui-y-nieve-hombre-wedze-ski-p-100-gris.jpg?format=auto&f=433x433"},
    {id: 5, name: "Mackbook", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"},
    {id: 6, name: "Mackbook", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"},
    {id: 7, name: "Mackbook", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"},
    {id: 8, name: "Mackbook", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"},
    {id: 9, name: "Mackbook", description: "Apple", price: "$5", image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/18742fe8-dbd7-4f59-b3d8-df3b0048658a/air-max-95-zapatillas-VZJRrr.png"}
]

const ProductosCatalogo = () => {


    const classes = useStyles();
    return (
        <main className={classes.main}>
            <Grid container justifyContent="center" spacing={4} >
                {products.map(product => (
                    <Grid item key={product.id} lg={3}>
                        <ProductoCatalogo product={product}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default ProductosCatalogo;