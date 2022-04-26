import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';
import NavBar from '../components/AppBar/NavBar';
import { ProductoCarrito } from '../shared/shareddtypes';

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

    const añadirAlCarrito = (producto: any) => {
        const carritoString = sessionStorage.getItem('carrito');
        let carrito = [];
        if (carritoString != null)
            carrito = JSON.parse(carritoString!);
        //let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };    
       
        let borrar=-1;
        let c=0;
        let p=0;
        carrito.forEach(function(value:any,index:any){
            
            if(value.producto._id===producto._id){
                borrar=index;
                c=value.cantidad;
    
            }
        });
        
        
        if(borrar>=0){
            let productoCarrito: ProductoCarrito = { producto: producto, cantidad: c+1, precioTotal: parseFloat(producto.price)*c };
             
            carrito.splice(borrar,1,productoCarrito);
        }else{
            let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };
            carrito.push(productoCarrito);
        }
        
        sessionStorage.setItem('carrito', JSON.stringify(carrito))
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