export type Producto = {
  _id: string
  name: string;
  price: number;
  short_description: string;
  long_description: string;
  brand: string;
  category: string;
  sub_category: string;
  image: string;

  type: string;
  color: string;
  size: number;
}

export type ProductoCarrito = {
  producto: Producto;
  cantidad: number;
  precioTotal: number;
}

export type Pedido = {
  _id: string,
  user: string,
  products: Producto[],
  order_date: Date,
  status: string,
  address: string
}

export type DireccionType = {
  street1: string;
  city: string;
  region: string;
  zip: string;
  country: string;
}