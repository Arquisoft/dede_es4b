import { Link } from 'react-router-dom';
import { Pedido } from '../../shared/shareddtypes';

const ListarPedidos = ({ pedidos }: { pedidos: Pedido[] }) => {

    return (
        <table className='m-auto w-3/5'>
            <thead className='flex flex-row border-b py-6 items-center text-center justify-around text-gray-500 font-medium'>
                <th className='basis-80'>Producto</th>
                <th className='basis-36'>Precio</th>
                <th className='basis-36'>Fecha de pedido</th>
                <th className='basis-36'>Estado</th>
                <th className='basis-36'></th>
            </thead>
            <tbody>
                {pedidos.map(pedido => pedido.products.map(producto =>
                    <tr key={producto._id} className="flex flex-row border-b items-center text-center justify-around">
                        <td className="basis-80">
                            <Link to={"/productos/" + pedido._id} className="flex items-center">
                                <img src={producto.image} className="w-28 py-2"></img>
                                <p className="text-left mx-4 font-bold">{producto.name}</p>
                            </Link>
                        </td>
                        <td className='basis-36 text-gray-500 font-medium'>
                            <p>{producto.price}€</p>
                        </td>
                        <td className='basis-36 text-gray-500 font-medium'>
                            <p>{new Date(pedido.order_date).toLocaleDateString("es-ES", {day: "numeric", month: "long", year: "numeric"})}</p>
                        </td>
                        <td className='basis-36 text-gray-500 font-medium'>
                            <p>{pedido.status}</p>
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