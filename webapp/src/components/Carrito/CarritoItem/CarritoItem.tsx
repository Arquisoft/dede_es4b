import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';
import useStyles from './styles';

// @ts-ignore
const CarritoItem = ( {item} ) => {
  const classes = useStyles();
    


    return (
    <Card>
      <CardMedia image={item.image} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.price} €</Typography>
        {}
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">-</Button>
          <Typography>1</Typography>
          <Button type="button" size="small">+</Button>
        </div>
        <Button variant="outlined" size="small" type="button" color="secondary">Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CarritoItem
