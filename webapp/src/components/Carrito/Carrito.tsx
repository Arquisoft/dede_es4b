import React, { useEffect } from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyles from './styles';
import CarritoItem from './CarritoItem/CarritoItem'
import NavBar from "../AppBar/NavBar";

interface producto {

    id: string;
    name: string;
    price: string;
    image: string;
}


export interface ProductoCarrito {
  producto: producto;
  cantidad: number;
  precioTotal: number;
}

const carrito : ProductoCarrito[] = [];

// function Carrito(productos : Producto[] ) {
//     this.prdocutos = productos
// }


// @ts-ignore
const Carrito = ({productos}) => {
  const classes = useStyles();
  let carrito :any= [];
  let carritoString = sessionStorage.getItem('carrito');
  if (carritoString != null)
    carrito = JSON.parse(carritoString!);


  // @ts-ignore
    const CarritoLleno = () => (
      <>
        <Grid container spacing={3}>
            {carrito.map((item : ProductoCarrito) => (
                <Grid item xs={12} sm={4} key={item.producto.id}>
                    <CarritoItem item={item.producto}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.carritoDetails}>
            <Typography variant="h4">
                Subtotal: {productos.length}
            </Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained">
                    Vaciar carrito
                </Button>
                <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
                    Comprar
                </Button>
            </div>
        </div>
      </>
  );

    // if(!carrito.line_items){
    //     return(
    //         <CarritoVacio/>
    //     )
    // }

  return (
    <div>
        <NavBar/>
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h2" gutterBottom>Tu carrito de la compra</Typography>
          <CarritoLleno/>
            
      </Container>
    </div>
  )
}

export default Carrito