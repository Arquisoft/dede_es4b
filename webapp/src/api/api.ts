import { DireccionType, Pedido, Producto } from '../shared/shareddtypes';

export const getProductos = async (): Promise<Producto[]> => {
  const respuesta = await fetch('http://localhost:5000/product/list');
  return respuesta.json();
}

export const calcularCostes = async (direccion: DireccionType): Promise<number> => {

  let response = await fetch("http://localhost:5000/product/shippementCost", {
    method: 'POST',
    body: JSON.stringify(direccion),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    let responseJSON = await response.json();
    return responseJSON.coste;
  }
  throw Error("Error al calular los costes");
};

// Obtner pedidos por usuario
export const getPedidosUsuario = async (): Promise<Pedido[]> => {
  const userSessionStr = sessionStorage.getItem('userSession');
  const userSession = JSON.parse(userSessionStr!);
  const userEmail = userSession.userName;
  const response = await fetch("http://localhost:5000/order/findByClient/" + userEmail)
  if (response.ok)
    return response.json();
  console.log(response);
  throw Error("Error al obtener los pedidos")
}


export const getProductosPagina = async (pageNum: number) => {
  const respuesta = await fetch('http://localhost:5000/product/list/' + pageNum);
  return respuesta.json();
}

export const getProductoByID = async (id: string) => {
  const respuesta = await fetch('http://localhost:5000/product/find/' + id);
  return respuesta.json();
}

export const realizarPedido = async (productos: Producto[], direccionStr: string, nombreUsuario: string) => {
  await fetch('http://localhost:5000/order/add',
    {
      method: 'POST',
      body: JSON.stringify({
        productos,
        user: nombreUsuario,
        order_date: Date.now(),
        status: "En ruta",
        shipping_address: direccionStr
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      
      if (!response.ok)
        throw Error("Error al realizar el pedido")
      else
        return response.json();
    }).catch(e => {
      throw Error(e);
    });
}