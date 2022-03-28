import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './dist/styles.css'

const Home = () => {

    return(
        <>
            <div className="bienvenida">
                <Box component="h1" color="black" >¡Bienvenido/a!</Box>
            </div>
            <div className="empezar">
                <Box component="h2" color="black" >¿Por dónde quieres empezar?</Box>
            </div>
            <div className="botones">
                <Button href="/login">
                    Iniciar sesión
                </Button>
                <Button href="/productos">
                    Ver catálogo de productos
                </Button>
            </div>
        </>
    );
};
export default Home;