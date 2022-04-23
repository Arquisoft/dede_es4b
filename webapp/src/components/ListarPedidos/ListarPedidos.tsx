import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Producto } from '../../shared/shareddtypes';

const ListarPedidos = ({pedidos} : {pedidos: Producto[]}) => {

    return (
        <table className='m-auto w-3/5'>
            <thead className='flex flex-row border-b py-6 items-center text-center justify-around text-gray-500 font-medium'>
                <th className='basis-80'>Producto</th>
                <th className='basis-36'>Precio</th>
                <th className='basis-36'>Estado</th>
                <th className='basis-36'></th>
            </thead>
            <tbody>
                {pedidos.map(pedido => (
                    <tr key={pedido._id} className="flex flex-row border-b items-center text-center justify-around">
                        <td className="basis-80">
                            <Link to={"/productos/" + pedido._id} className="flex items-center">
                                <img src={pedido.image} className="w-28 py-2"></img>
                                <p className="text-left mx-4 font-bold">{pedido.name}</p>
                            </Link>
                        </td>
                        <td className='basis-36 text-gray-500 font-medium'>
                            <p>{pedido.price}€</p>
                        </td>
                        <td className='basis-36 text-gray-500 font-medium'>
                            <p >Entregado</p>
                        </td>
                        <td className='basis-36'>
                            <Link to={"#"} className='inline-block text-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring'>Ver pedido</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListarPedidos;