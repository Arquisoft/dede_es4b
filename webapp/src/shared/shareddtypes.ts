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