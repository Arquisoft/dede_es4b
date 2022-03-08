import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import useStyles from './styles'
import { AddShoppingCart } from "@mui/icons-material";

const ProductoCatalogo = ({ product }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterButtom>
                        {product.name}
                    </Typography>
                </div>
                <div className={classes.description}>
                    <Typography  variant="p" color="textSecondary">{product.description}</Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Typography >
                    {product.price}
                </Typography>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart color='primary' fontSize='small' />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ProductoCatalogo