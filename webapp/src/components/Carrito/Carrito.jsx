import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyles from './styles';

const Carrito = ({ carrito }) => {
  console.log(carrito.line_items);
  
  const classes = useStyles();
   
  const CarritoVacio = () => (
      <Typography variant="subtitle1">No tienes productos en tu carrito de la compra</Typography>
  );

  const CarritoLleno = () => (
      <>
        <Grid container spacing={3}>
            {carrito.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <div>{item.name}</div>
                </Grid>
            ))}
        </Grid>
        <div className={classes.carritoDetails}>
            <Typography variant="h4">
                Subtotal: {carrito.subtotal.formatted_with_symbol}
            </Typography>
            <div>
                <button className={classes.emptyButton} size="large" type="button" variant="contained" color="secundary">
                    Empty Carrito
                </button>
                <button className={classes.checkoutButton} size="large" type="button" variant="contained" color="secundary">
                    CheckOut
                </button>
            </div>
        </div>
      </>
  );

  if(!carrito.line_items) return "Loading...";

  return (
    <div>
      <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title}>Tu carrito de la compra</Typography>
            {!carrito.line_items.length ? <CarritoVacio/> : <CarritoLleno/>}
      </Container>
    </div>
  )
}

export default Carrito
