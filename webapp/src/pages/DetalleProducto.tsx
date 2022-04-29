import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';
import NavBar from '../components/AppBar/NavBar';
import { getProductoByID } from '../api/api';
import { añadirAlCarrito, getCarrito } from '../util/carrito';
import { Producto } from '../shared/shareddtypes';

const DetalleProducto = () => {
    const params = useParams();
    const [product, setProduct] = useState<Producto>();

    const getProduct = async () => {
        getProductoByID(params.id!)
        .then(data => setProduct(data.product));
    }

useEffect(() => {
    getProduct();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [product])

return (
    <div className="detalles">
        <header>
            <NavBar />
        </header>
        <div className="contenidoDetalles">
            <Grid container>
                <Grid className="columnaIzquierda" item xs={12} sm={6} md={4} lg={3}>
                    <img src={product?.image} alt="Imagen producto" />
                </Grid>
                <Grid className="columnaDerecha" item xs={12} sm={6} md={4} lg={3}>
                    <h1 className="tituloProducto">{product?.name}</h1>
                    <p className="descripcionCorta">
                        {product?.short_description}
                    </p>
                    <p className="precio">
                        Precio: {product?.price} €
                    </p>
                    <p className="talla">
                        Talla: {product?.size}
                    </p>
                    <Box style={{ justifyContent: 'center' }} className="botonAñadir">
                        <Button onClick={() => añadirAlCarrito(product!)} color="inherit" sx={{ border: 1 }}>
                            Añadir a carrito
                        </Button>
                    </Box>
                    <p className="descripcionLarga">
                        {product?.long_description}
                    </p>
                </Grid>
            </Grid>
        </div>
    </div>
)
}

export default DetalleProducto;