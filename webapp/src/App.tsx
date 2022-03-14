import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import Carrito from './components/Carrito/Carrito';

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import ResponsiveAppBar from './components/AppBar/ResponsiveAppBar';
import NavBar from './components/AppBar/NavBar';
import './App.css';

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  interface Producto {

    id: string;
    name: string;
    price: string;
    image: string;

  }

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }


  useEffect(()=>{
    refreshUserList();
  },[]);

  const getProductos = async () => {
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



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BrowserRouter>

      <Routes>
        <NavBar/>
        <Route path="/carrito" element={<Carrito productos={productos}/>}/>

      </Routes>

  </BrowserRouter>
  );
}

export default App;
