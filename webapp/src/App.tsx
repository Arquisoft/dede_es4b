import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './components/Carrito/Carrito';
import DetalleProducto from './pages/DetalleProducto';
import CheckOut from './pages/CheckOut';
import { SessionProvider} from '@inrupt/solid-ui-react';

export const webUrl = "https://localhost:3000";


export const isLogeado = (): boolean => {
  return getToken() != null;
}

function getToken(): string | null {
  const userSessionStr = sessionStorage.getItem('userSession');
  if (userSessionStr != null){
    const userSession = JSON.parse(userSessionStr!);
    return userSession.token;
  }
  return null;
}

export const getPodSession = () => {
  const item = sessionStorage.getItem("podSession");
  if (item != null)
    return JSON.parse(item);
  return null;
}

function App(): JSX.Element {

  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/productos/:id" element={<DetalleProducto/>} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
