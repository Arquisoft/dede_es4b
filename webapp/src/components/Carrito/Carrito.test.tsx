import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {añadirAlCarrito, añadirAlCarritoNuevoProducto, eliminarAlCarrito, getCarrito} from "../../util/carrito";
import { ProductoCarrito } from "../../shared/shareddtypes";
import { Producto } from '../../shared/shareddtypes';
import ProductosCatalogo from "../ProductosCatalogo/ProductosCatalogo";
import Carrito from "./Carrito";

test("carrito con un producto", async () => {
    const productos: Producto[]=[
        {
                _id: "1",
                name: "Balon",
                price: 5,
                short_description: "Balon de futbol",
                long_description: "Es un balon para jugar al futbol, blanco y negro",
                brand: "no marca",
                category: "futbol",
                sub_category: "accesorio",
                image: "no imagen",
                type: "balon",
                color: "blanco y negro",
                size: 0

        }
    ]
    añadirAlCarritoNuevoProducto(productos[0]);
    const { getByText } = render(<Carrito />, { wrapper: MemoryRouter });
    expect(getByText(productos[0].name)).toBeInTheDocument();
    //No coje numeros
    // expect(getByText(productos[0].price)).toBeInTheDocument();

});