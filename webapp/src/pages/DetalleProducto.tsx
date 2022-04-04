import React, { useState } from 'react';
import { useEffect } from 'react';
import { producto } from './Catalogo';
import { useParams } from 'react-router-dom';
import './dist/styles.css';
import { Box, Button, Grid } from '@mui/material';
import NavBar from '../components/AppBar/NavBar';

const DetalleProducto = () => {
    const params = useParams();
    const [product, setProduct] = useState('');
    const [nombre, setNombre] = useState('');
    const [short, setShort] = useState('');
    const [long, setLong] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const getProduct = async (params : any) => {
        let id = params.id;
        console.log(id);
        const respuesta = await fetch('http://localhost:5000/product/find/' + id)
        .then(response =>{
            if (response?.ok){
                response.json().then(
                    data  => {
                        setProduct(data)
                        setNombre(data.name)
                        setShort(data.short_description)
                        setLong(data.long_description)
                        setSize(data.size)
                        setPrice(data.price)
                        setImage(data.image)
                        console.log(data)
                    }
                );
            }
        })
        
    }

    

    useEffect(() => {
        getProduct(params);
    }, [])

    return (
        <div className="detalles">
            <header>
                <NavBar/>
            </header>
            <div className="contenidoDetalles">
                <Grid container>
                    <Grid className="columnaIzquierda" item xs={12} sm={6} md={4} lg={3}> 
                        <img src={image} />
                    </Grid>
                    <Grid className="columnaDerecha" item xs={12} sm={6} md={4} lg={3}>
                        <h1 className="tituloProducto">{nombre}</h1>
                        <p className="descripcionCorta">
                            {short}
                        </p>
                        <p className="precio">
                            Precio: {price} €
                        </p>
                        <p className="talla">
                            Talla: {size}
                        </p>
                        <Box style={{justifyContent: 'center'}} className="botonAñadir">
                            <Button color="inherit" sx={{border: 1}}>
                                Añadir a carrito
                            </Button>
                        </Box>
                        <p className="descripcionLarga">
                            {long}
                        </p>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default DetalleProducto;