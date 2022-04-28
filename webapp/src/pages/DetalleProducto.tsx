import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './dist/styles.css';
import { Box, Button, Grid } from '@mui/material';
import NavBar from '../components/AppBar/NavBar';
import { ProductoCarrito } from '../components/Carrito/Carrito';

const DetalleProducto = () => {
    const params = useParams();
    const [product, setProduct] = useState('');
    const [nombre, setNombre] = useState('');
    const [short, setShort] = useState('');
    const [long, setLong] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const getProduct = async (args : any) => {
        let id = args.id;
        console.log(id);
        await fetch('http://localhost:5000/product/find/' + id)
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

    useEffect(() => {
        getProduct(params);
    }, [params])

    return (
        <div className="detalles">
            <header>
                <NavBar/>
            </header>
            <div className="contenidoDetalles">
                <Grid container>
                    <Grid className="columnaIzquierda" item xs={12} sm={6} md={4} lg={3}> 
                        <img src={image} alt="Imagen producto" />
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
                            <Button onClick={() => añadirAlCarrito(product)} color="inherit" sx={{border: 1}}>
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