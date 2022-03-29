import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './dist/styles.css'

const Home = () => {

    return(
        <>
            <header>
                <div className="mt-6">
                    <h1>¡Bienvenido/a!</h1>
                </div>
            </header>
            
            <div className="empezar">
                <Box component="h2" color="black" >¿Por dónde quieres empezar?</Box>
            </div>
            <div className="botonLogin">
                <Button href="/login">
                    Iniciar sesión
                </Button>
            </div>
            <div className="botonCatalogo">
                <Button href="/productos">
                    Ver catálogo de productos
                </Button>
            </div>
        </>
    );
};
export default Home;