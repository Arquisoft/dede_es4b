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
          <div>
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

              {carrito.map((producto: ProductoCarrito) => (

                <tr key={producto.producto._id}>
                  <td>{producto.producto.name}</td>
                  <td>{producto.precioTotal} €</td>
                  <td><button type="button" className='unidades' onClick={() => eliminarAlCarrito(producto)}>-</button>
                    {producto.cantidad}
                    <button type="button" className='unidades' onClick={() => añadirAlCarrito(producto)}>+</button>
                  </td>
                  <td><button type="button" className='botonEliminar' onClick={() => eliminar(producto, carrito)}>
                    Remove
                  </button>
                  </td>
                </tr>


              ))}
            </tbody>
          </table>

          <div>
            <br />
            <div className="subtotal">
              <p>Subtotal: {precio.toFixed(2)} €</p>

            </div>
            <div>
              <button type="button" className="botonComprar" onClick={() => navigate("/checkout")} >
                Comprar
              </button>
            </div>
            <div>
              <p>
                o
                <Link to="/productos" className="botonSeguirComprando">
                  continua comprando
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