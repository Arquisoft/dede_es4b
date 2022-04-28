import { Pedido, Producto } from '../shared/shareddtypes';

export const getProductos = async (): Promise<Producto[]> => {
  const respuesta = await fetch('http://localhost:5000/product/list');
  return respuesta.json();
}

export const calcularCostes = async (direccion: JSON): Promise<number> => {

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


export const getProductosPagina = async (pageNum : number) => {
  const respuesta = await fetch('http://localhost:5000/product/list/' + pageNum);
  return respuesta.json();
}