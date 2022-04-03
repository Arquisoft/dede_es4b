import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './components/Carrito/Carrito';

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

function App(): JSX.Element {
  const token = getToken();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/carrito" element={<Carrito/>}/>
          <Route path="/productos" element={<Catalogo/>} />
          <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
