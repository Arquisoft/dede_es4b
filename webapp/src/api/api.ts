import {Producto} from '../shared/shareddtypes';

export const getProductos = async () : Promise<Producto[]> =>  {
  const respuesta = await fetch('http://localhost:5000/product/list');
  return respuesta.json();
}

export const calcularCostes = async (direccion : JSON) : Promise<number> => {
  
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
  throw new Error("Error al calular los costes");
};