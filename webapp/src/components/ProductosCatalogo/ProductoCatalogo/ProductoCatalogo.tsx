import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import useStyles from './styles'
import { AddShoppingCart } from "@mui/icons-material";
import { CardActionArea } from '@mui/material';
import { producto } from '../../../pages/Catalogo';
import { ProductoCarrito } from '../../../components/Carrito/Carrito';

// Guarda el producto en la sesión.
const añadirAlCarrito = (producto: any) => {
    const carritoString = sessionStorage.getItem('carrito');
    let carrito = [];
    if (carritoString != null)
        carrito = JSON.parse(carritoString!);

    let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };
    carrito.push(productoCarrito);
    sessionStorage.setItem('carrito', JSON.stringify(carrito))
}

const ProductoCatalogo = ({ producto }: { producto: producto }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea href={'/' + producto.ids}>
                <CardMedia className={classes.media} image={producto.image} title={producto.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {producto.name}
                        </Typography>

                        <div className={classes.description}>
                            <Typography variant="subtitle1" color="textSecondary">{producto.description}</Typography>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Typography > {producto.price} </Typography>
                <IconButton aria-label="Add to Cart" onClick={() => añadirAlCarrito(producto)}>
                    <AddShoppingCart color='primary' fontSize='small' />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default ProductoCatalogo;