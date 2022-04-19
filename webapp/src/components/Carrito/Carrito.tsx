import { useNavigate } from "react-router-dom";
import NavBar from "../AppBar/NavBar";
import '../dist/css/styles.css';


interface Producto {

    id: string;
    name: string;
    price: string;
    image: string;
}


export interface ProductoCarrito {
  producto: Producto;
  cantidad: number;
  precioTotal: number;
}



// @ts-ignore
const Carrito = () => {
  const navigate = useNavigate();
  var precio=0;
  

  let carrito :any= [];
  let carritoString = sessionStorage.getItem('carrito');
  if (carritoString != null)
    carrito = JSON.parse(carritoString!);
  
  for (let i = 0; i < carrito.length; i++) {
    precio += carrito[i].precioTotal;
  }
  // Guarda el producto en la sesión.
  const añadirAlCarrito = (producto: any, carrito: any) => {
    let borrar=carrito.indexOf(producto);
    
    let productoCarrito: ProductoCarrito = { producto: producto.producto, cantidad: producto.cantidad+1, precioTotal: parseFloat(producto.producto.price)*(producto.cantidad+1)};
    carrito.splice(borrar,1,productoCarrito);
    //carrito.push(productoCarrito);
    sessionStorage.setItem('carrito', JSON.stringify(carrito))
    window.location.reload();
  }

   // Guarda el producto en la sesión.
  const eliminarAlCarrito = (producto: any, carrito: any) => {
    let borrar=carrito.indexOf(producto);
    if(producto.cantidad===1){
      carrito.splice(borrar,1);
    }else{
      let productoCarrito: ProductoCarrito = { producto: producto.producto, cantidad: producto.cantidad-1, precioTotal: parseFloat(producto.producto.price)*(producto.cantidad-1) };
      carrito.splice(borrar,1,productoCarrito);
      //carrito.push(productoCarrito);
      
    }
    sessionStorage.setItem('carrito', JSON.stringify(carrito))
    window.location.reload();
  }

    // Guarda el producto en la sesión.
    const eliminar = (producto: any, carrito: any) => {
      let borrar=carrito.indexOf(producto);
      carrito.splice(borrar,1);
      sessionStorage.setItem('carrito', JSON.stringify(carrito))
      window.location.reload();
    }
  
  const volverCatalogo=()=>{
    window.location.href="\\productos";
  }
  console.log(carrito);
    return (
    <>

      <div>
        <header>
          <NavBar/>
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
              
              <tr>
                <td>{producto.producto.name}</td>
                <td>{producto.precioTotal} €</td>
                <td><button type="button" className='unidades' onClick={() => eliminarAlCarrito(producto, carrito)}>-</button>
                      {producto.cantidad} 
                    <button type="button" className='unidades' onClick={() => añadirAlCarrito(producto, carrito)}>+</button>
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
            <br/>
            <div className="subtotal">
              <p>Subtotal: {precio.toFixed(2)} €</p>
              
            </div>
            <div>
              <button type="button" className="botonComprar" onClick={()=>navigate("/checkout")} >
                Comprar
              </button>
            </div>
            <div>
              <p>
                o
                <button type="button" className="botonSeguirComprando"
                  onClick={()=>volverCatalogo()}> continua comprando
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