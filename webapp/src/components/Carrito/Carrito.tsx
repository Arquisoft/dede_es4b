import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyles from './styles';
import CarritoItem from './CarritoItem/CarritoItem'

interface Producto {

    id: string;
    name: string;
    price: string;
    image: string;

}

// function Carrito(productos : Producto[] ) {
//     this.prdocutos = productos
// }


// @ts-ignore
const Carrito = ({productos}) => {

  const classes = useStyles();
   
  const CarritoVacio = () => (
      <Typography variant="subtitle1">No tienes productos en tu carrito de la compra</Typography>
  );

  // @ts-ignore
    const CarritoLleno = () => (
      <>
        <Grid container spacing={3}>
            {productos.map((item : Producto) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CarritoItem item={item}/>
                </Grid>
            ))};
        </Grid>
        <div className={classes.carritoDetails}>
            <Typography variant="h4">
                Subtotal: {2}
            </Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained">
                    Empty Carrito
                </Button>
                <Button className={classes.checkoutButton} size="large" type="button" variant="contained">
                    CheckOut
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
      <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Tu carrito de la compra</Typography>
          <CarritoLleno/>
            {/*{!carrito.line_items.length ? <CarritoVacio/> : <CarritoLleno/>}*/}
      </Container>
    </div>
  )
}

export default Carrito
