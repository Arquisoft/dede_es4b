import { TruckIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPedidoPorId } from '../api/api';
import NavBar from '../components/AppBar/NavBar';
import Cargando from '../components/Cargando/Cargando';
import { Pedido } from '../shared/shareddtypes';

const VerPedido = () => {
  const id = useParams().id;
  const [pedido, setPedido] = useState<Pedido>();
  const [cargando, setCargando] = useState(false);
  const [cargandoTexto, setCargandoTexto] = useState("Cargando pedido");
  let precioTotal = 0;


  const getPedido = async () => {
    setCargando(true);
    await getPedidoPorId(id!)
      .then(data => setPedido(data))
      .catch(e => alert(e));
    setCargando(false);
  }

  useEffect(() => {
    getPedido();
  }, [])

  pedido?.products.forEach(p => precioTotal += p.price);

  return (
    <>
      <NavBar />
        {cargando ? (<Cargando cargando={cargando} cargandoTexto={cargandoTexto} />) :
        (
          <>
            <div className='m-auto max-w-6xl my-24 p-4 rounded-md border-2 border-gray-300 shadow-sm'>
              <div className='flex border-b-2 justify-between text-center px-4'>
                <div>
                  <p className="text-lg font-medium p-2">Número de pedido</p>
                  <p className=" text-gray-500 p-2">{pedido?._id.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-lg font-medium m-auto p-2">Fecha de pedido</p>
                  <p className="text-gray-500 m-auto p-2">{new Date(pedido?.order_date!).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div>
                  <p className="text-lg font-medium m-auto p-2">Precio total</p>
                  <p className="text-gray-500 m-auto p-2">{precioTotal}€</p>
                </div>
                <div>
                  <p className="text-lg font-medium m-auto p-2">Dirección de entrega</p>
                  <p className="text-gray-500 m-auto p-2">{pedido?.address}</p>
                </div>
              </div>
              <div>
                {
                  pedido?.products.map(producto => (
                    <div key={producto._id} className="flex border-b-2 p-4">
                      <img src={producto.image} alt={"Imagen del producto" + producto.name} className="h-52 flex-none"></img>
                      <div className='flex flex-col flex-auto px-4'>
                        <div className='h-4/5'>
                          <div className='flex justify-between'>
                            <h3 className="text-lg font-medium">{producto.name}</h3>
                            <p className="text-lg font-medium">{producto.price}€</p>
                          </div>
                          <p className='mt-2 text-gray-500'>{producto.long_description}</p>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                          <div className='flex items-center gap-2'>
                            <TruckIcon className='w-6' />
                            <p className="font-medium text-gray-500 ">En ruta</p>
                          </div>
                          <Link to={"/productos/" + producto._id} className=" self-end p-3 border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Ver producto
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default VerPedido