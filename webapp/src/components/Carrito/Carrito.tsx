import React from 'react'

import NavBar from "../AppBar/NavBar";
import { Fragment, useState } from 'react'
import { Disclosure, Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import '../dist/css/styles.css';

interface Producto {

    id: string;
    name: string;
    price: string;
    image: string;

}




// @ts-ignore
const Carrito = ({productos}) => {

  const [open, setOpen] = useState(true);                
  var precio=0;
  
  
  return (
    <>
      <NavBar/>
      <div>
        <header>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1>Carrito de la compra</h1>
          </div>
        </header>
        <main>
       
        <table>
          <caption>Tu pedido</caption>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Unidades</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto: Producto) => (
             
              <tr>
                <td>{producto.name}</td>
                <td>{producto.price}</td>
                <td><button type="button" className='unidades'>-</button>
                      1
                    <button type="button" className='unidades'>+</button>
                </td>
                <td><button type="button" className='botonEliminar'> 
                Remove 
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
          <div>
            <div className="subtotal">
              <p>Subtotal: XXX €</p>
              
            </div>
            <div>
              <button type="button" className="botonComprar" >
                Comprar
              </button>
            </div>
            <div>
              <p>
                o 
                <button type="button" className="botonSeguirComprando"
                  onClick={() => setOpen(false)}> continua comprando
                </button>
              </p>
            </div>
          </div>
          

         
          
          </main>
        
      </div>
    </>
  )
  
}

export default Carrito