import { Link, useNavigate } from "react-router-dom";
import { ProductoCarrito } from "../../shared/shareddtypes";
import { añadirAlCarrito, eliminarAlCarrito, getCarrito } from "../../util/carrito";
import NavBar from "../AppBar/NavBar";
import '../../css/styles.css';

// @ts-ignore
const Carrito = () => {
  const navigate = useNavigate();
  var precio = 0;

  let carrito: any = getCarrito();

  for (let i = 0; i < carrito.length; i++) {
    precio += carrito[i].precioTotal;
  }


  const eliminar = (producto: any, carrito: any) => {
    let borrar = carrito.indexOf(producto);
    carrito.splice(borrar, 1);
    sessionStorage.setItem('carrito', JSON.stringify(carrito))
    window.location.reload();
  }

  return (
    <>

      <div>
        <header>
          <NavBar />
          <br/>
        </header>
        <main className="container mx-auto">
          <div>
            <h1 className="text-purple-700 text-5xl font-extrabold tracking-tight">Carrito de la compra</h1>
            <br></br>          
          </div>
          <table className="border-collapse">
            <caption className="text-purple-400 font-mono text-lg">Tu pedido</caption>
            <thead>
              <tr>
                <th className="text-left p-2 border-solid border-purple-200 border-b-4">Producto</th>

                <th className="text-left p-2 border-solid border-purple-200 border-b-4">Precio</th>

                <th className="text-left p-2 border-solid border-purple-200 border-b-4">Unidades</th>

                <th className="text-left p-2 border-solid border-purple-200 border-b-4"></th>
              </tr>
            </thead>
            <tbody>

              {carrito.map((producto: ProductoCarrito) => (

                <tr key={producto.producto._id} className="hover:bg-purple-100">
                  <td className="text-left p-2 border-solid border-purple-200 border-b-4">{producto.producto.name}</td>

                  <td className="text-left p-2 border-solid border-purple-200 border-b-4">{producto.precioTotal.toFixed(2)} €</td>

                  <td data-testid="cantidad-producto" className=" p-2 border-solid border-purple-200 border-b-4 text-center">
                    <button type="button" className='bg-purple-300 rounded-lg h-5 w-5  opacity-60' onClick={() => eliminarAlCarrito(producto)}>- </button>
                     {producto.cantidad} 
                    <button type="button" className='bg-purple-300 rounded-lg h-5 w-5  opacity-60' onClick={() => añadirAlCarrito(producto)}> +</button>
                  </td>

                  <td className="text-left p-2 border-solid border-purple-200 border-b-4"><button type="button" className='text-red-800' onClick={() => eliminar(producto, carrito)}>
                    Remove
                  </button>
                  </td>
                </tr>


              ))}
            </tbody>
          </table>

          <div>
            <br />
            <div className="flex justify-between text-base text-gray-900">
              <p>Subtotal: {precio.toFixed(2)} €</p>
            </div>
            <br/>
            <div>
              <button type="button" className="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={() => navigate("/checkout")} >
                Comprar
              </button>
            </div>
            <div>
              <p>
                <Link to="/productos" className="bg-white text-purple-500 font-medium">
                    o continua comprando
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Carrito