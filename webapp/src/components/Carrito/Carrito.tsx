import React from 'react'

import NavBar from "../AppBar/NavBar";
import { Fragment, useState } from 'react'
import { Disclosure, Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

interface Producto {

    id: string;
    name: string;
    price: string;
    image: string;

}




// @ts-ignore
const Carrito = ({productos}) => {

  console.log(productos);
  const [open, setOpen] = useState(true);                

  
  
  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Carrito de la compra</h1>
          </div>
        </header>
        <main>
        <table className="table-auto">
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
                <td><button>-</button>
                      1
                    <button>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div>
              <button className="comprar" >
                Comprar
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
          

          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          
          </main>
        
      </div>
    </>
  )
  
}

export default Carrito