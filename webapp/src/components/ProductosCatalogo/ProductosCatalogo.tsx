import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import ProductoCatalogo from './ProductoCatalogo/ProductoCatalogo';
import useStyles from './styles';
import {Button, Divider, Menu, MenuItem, Pagination} from "@mui/material";
import { Icon } from '@iconify/react';
import Box from "@mui/material/Box";
import NavBar from "../AppBar/NavBar";

interface producto {
    ids: number;
    name: string;
    description: string;
    price: string;
    image: string;
}

const ProductosCatalogo = () => {

    const [productos, setProductos] = useState<producto[]>([]);

    const getProductos = async (): Promise<producto[]> => {
        let respuesta = await fetch('http://localhost:5000/product/list')

        return respuesta.json();
    }

    const refrescarProductos = async () => {
        let respuesta = await getProductos();

        setProductos(respuesta);
    }

    useEffect(() => {
        refrescarProductos();
    }, [])


    // Ordenar
    const [open, setOpen] = useState(null);

    const handleOpen = (event : any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
       // TODO
        setOpen(null)
    };

    const classes = useStyles();
    return (
        <>
            <NavBar/>
            <main className={classes.main}>
                <div className={classes.titulo}>
                    <Box component="h1" color="indigo" >Catálogo de productos</Box>
                    <Divider />
                </div>

                <div className={classes.filtro}>
                    <Button onClick={handleOpen} disableRipple className={classes.paginacion}>
                        Ordenar
                        <Icon icon="ic:round-filter-list" />
                    </Button>
                </div>

                <Menu
                    keepMounted
                    anchorEl={open}
                    open={Boolean(open)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={handleClose}>Precio ascendente</MenuItem>
                    <MenuItem onClick={handleClose}>Precio descendente</MenuItem>
                </Menu>
                <Grid container justifyContent="center" spacing={1}>
                    {productos.map(product => (
                        <Grid item key={product.ids} xs={12} sm={6} md={4} lg={3}>
                            <ProductoCatalogo product={product} />
                        </Grid>
                    ))}
                </Grid>
                <Pagination className={classes.paginacion} count={10} shape="rounded" />
            </main>
        </>
    );
}

export default ProductosCatalogo;