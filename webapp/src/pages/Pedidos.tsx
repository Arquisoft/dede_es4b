import React, { useEffect, useState } from 'react'
import { getPedidosUsuario } from '../api/api';
import NavBar from '../components/AppBar/NavBar';
import ListarPedidos from '../components/ListarPedidos/ListarPedidos'
// import Paginacion from '../components/Paginacion/Paginacion';
import { Pedido, Producto } from '../shared/shareddtypes';

const Pedidos = () => {

    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        if (pedidos.length === 0)
            getPedidosUsuario().then(newPedidos => setPedidos(newPedidos));
    }, []);

    console.log(pedidos.at(0)?.order_date);
    

    return (
        <div>
            <NavBar />
            <h1 className="my-6 text-3xl font-extrabold tracking-tight text-gray-900 text-center">Historial de pedidos</h1>
            <ListarPedidos pedidos={pedidos} />
            {/* <Paginacion onChange={() => ""} maxPages={3} /> */}
        </div>

    )
}

export default Pedidos