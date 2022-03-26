import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import useStyles from './styles'
import { AddShoppingCart } from "@mui/icons-material";
import { CardActionArea } from '@mui/material';
import { producto } from '../../../pages/Catalogo';

interface ProductoCarrito{
    producto : producto;
    cantidad : number;
    precioTotal : number;
}

const carrito : ProductoCarrito[] = [];


const ProductoCatalogo = ( {producto}: {producto: producto} ) => {
    const classes = useStyles();


    const añadirAlCarrito = (producto : producto) => {
        let productoCarrito : ProductoCarrito = {producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price)};
        carrito.push(productoCarrito);
        console.log(carrito);
    }

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
}

export default ProductoCatalogo