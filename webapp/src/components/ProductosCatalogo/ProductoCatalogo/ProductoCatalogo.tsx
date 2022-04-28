import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, CardActionArea } from '@mui/material';
import useStyles from './styles'
import { AddShoppingCart } from "@mui/icons-material";
import { producto } from '../../../pages/Catalogo';
import { ProductoCarrito } from '../../../components/Carrito/Carrito';


// Guarda el producto en la sesión.
const añadirAlCarrito = (newProducto: any) => {
    const carritoString = sessionStorage.getItem('carrito');
    let carrito = [];
    if (carritoString != null)
        carrito = JSON.parse(carritoString);
   
    let borrar=-1;
    let c=0;
    carrito.forEach(function(value:any,index:any){
        
        if(value.producto._id===newProducto._id){
            borrar=index;
            c=value.cantidad;

        }
    });
    
    
    if(borrar>=0){
        let productoCarrito: ProductoCarrito = { producto: newProducto, cantidad: c+1, precioTotal: parseFloat(newProducto.price)*c };
         
        carrito.splice(borrar,1,productoCarrito);
    }else{
        let productoCarrito: ProductoCarrito = { producto: newProducto, cantidad: 1, precioTotal: parseFloat(newProducto.price) };
        carrito.push(productoCarrito);
    }
    
    sessionStorage.setItem('carrito', JSON.stringify(carrito))
}

const ProductoCatalogo = ({ producto }: { producto: producto }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea href={"/productos/" + producto._id} >
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