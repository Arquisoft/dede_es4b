import { DireccionType, Pedido, Producto, RegistroType } from '../shared/shareddtypes';

const API_URL = process.env.REACT_APP_API_URI || 'https://localhost:5000'

export const getProductos = async (): Promise<Producto[]> => {
  const respuesta = await fetch(API_URL + '/product/list');
  return respuesta.json();
}

export const calcularCostes = async (direccion: DireccionType): Promise<number> => {

  let response = await fetch(API_URL + "/product/shippementCost", {
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
  const response = await fetch(API_URL + "/order/findByClient/" + userEmail)
  if (response.ok)
    return response.json();
  throw Error("Error al obtener los pedidos")
}


export const getProductosPagina = async (pageNum: number) => {
  const respuesta = await fetch(API_URL + '/product/list/' + pageNum);
  return respuesta.json();
}

export const getProductosSubcategoria = async (subcategoria: string, pageNum: number) => {
  const respuesta = await fetch(API_URL + "/product/list/sub_category/" + subcategoria + "/" + pageNum);
  return respuesta.json();
}

export const searchProductos = async (campoSearch : string) : Promise<any> => {
  const respuesta = await fetch(API_URL + "/product/list/search/" + campoSearch + "/" + 0);
  return respuesta.json();
}

export const getProductoByID = async (id: string) => {
  const respuesta = await fetch(API_URL + '/product/find/' + id);
  return respuesta.json();
}

export const realizarPedido = async (products: Producto[], direccionStr: string, nombreUsuario: string) => {
  await fetch(API_URL + '/order/add',
    {
      method: 'POST',
      body: JSON.stringify({
        products,
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

export const getPedidoPorId = async (pedidoID: string): Promise<Pedido> => {
  const res = await fetch(API_URL + '/order/find/' + pedidoID);
  return res.json();
}

export const postRegistro = async (datos: RegistroType) : Promise<Response> => {
  return fetch(API_URL + '/user/register', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const postLogin = async (email: string, password: string) : Promise<Response> => {
  return fetch(API_URL + '/login', {
    method: 'POST',
    body: JSON.stringify({ userName: email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}