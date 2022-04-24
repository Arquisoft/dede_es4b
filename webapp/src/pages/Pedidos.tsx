import React, { useEffect, useState } from 'react'
import { getProductos } from '../api/api';
import NavBar from '../components/AppBar/NavBar';
import ListarPedidos from '../components/ListarPedidos/ListarPedidos'
import Paginacion from '../components/Paginacion/Paginacion';
import { Producto } from '../shared/shareddtypes';

const Pedidos = () => {

    const [pedidos, setPedidos] = useState<Producto[]>([]);

    useEffect(() => {
        if (pedidos.length == 0)
            getProductos().then(pedidos => setPedidos(pedidos));
    }, [pedidos]);

    return (
        <div>
            <NavBar />
            <h1 className="my-6 text-3xl font-extrabold tracking-tight text-gray-900">Historial de pedidos</h1>
            <ListarPedidos pedidos={pedidos} />
            <Paginacion />
        </div>

    )
}

export default Pedidos