import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Catalogo from './pages/Catalogo';

export const isLogeado = (): boolean => {
  return getToken() != null;
}

//TODO
function getToken(): string | null {
  const tokenString = sessionStorage.getItem('token');
  // const userToken = JSON.parse(tokenString!);
  // return userToken?.token;
  return tokenString;
}

function App(): JSX.Element {
  const token = getToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        {/* <Route path="/carrito" element={<Carrito productos={productos} />} /> */}
        <Route path="productos" element={<Catalogo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
