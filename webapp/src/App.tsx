import React, { useState, useEffect } from 'react';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import Carrito from './components/Carrito/Carrito';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);
  const [carrito, setCarrito] = useState([]);
  
  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

 
  useEffect(()=>{
    refreshUserList();
  },[]);



  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/carrito" element={<Carrito carrito={carrito}/>}/>  
        
      </Routes>
    
  </BrowserRouter>
    
  );
}

export default App;
