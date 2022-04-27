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
            <h1 className="text-cyan-700 font-mono text-3xl text-center tracking-tight">Carrito de la compra</h1>
            <br></br>          
          </div>
          <table className="border-collapse">
            <caption className="text-cyan-600 font-mono text-lg">Tu pedido</caption>
            <thead>
              <tr>
                <th className="text-left p-2 border-solid border-blue-100 border-b-4">Producto</th>
                <br/>
                <th className="text-left p-2 border-solid border-blue-100 border-b-4">Precio</th>
                <br/>
                <th className="text-left p-2 border-solid border-blue-100 border-b-4">Unidades</th>
                <br/>
                <th className="text-left p-2 border-solid border-blue-100 border-b-4"></th>
              </tr>
            </thead>
            <tbody>

              {carrito.map((producto: ProductoCarrito) => (

                <tr key={producto.producto._id} className="hover:bg-blue-100">
                  <td className="text-left p-2 border-solid border-blue-100 border-b-4">{producto.producto.name}</td>
                  <br/>
                  <td className="text-left p-2 border-solid border-blue-100 border-b-4">{producto.precioTotal.toFixed(2)} €</td>
                  <br/>
                  <td className="text-left p-2 border-solid border-blue-100 border-b-4">
                    <button type="button" className='bg-blue-200 rounded-full opacity-60' onClick={() => eliminarAlCarrito(producto)}>-</button>
                    {producto.cantidad}
                    <button type="button" className='bg-blue-200 rounded-full opacity-60' onClick={() => añadirAlCarrito(producto)}>+</button>
                  </td>
                  <br/>
                  <td className="text-left p-2 border-solid border-blue-100 border-b-4"><button type="button" className='text-red-800' onClick={() => eliminar(producto, carrito)}>
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
              <button type="button" className="bg-cyan-400 text-white w-48 rounded-lg h-6" onClick={() => navigate("/checkout")} >
                Comprar
              </button>
            </div>
            <div>
              <p>
                <Link to="/productos" className="bg-white text-cyan-600 font-medium">
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