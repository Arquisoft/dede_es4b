import { render, fireEvent, screen, getByLabelText, getByTestId, getAllByTestId } from '@testing-library/react';
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

    const carrito: ProductoCarrito[]=[
        {
            producto:productos[0],
            cantidad:1,
            precioTotal:5
        }
    ];

    const { getByText } = render(<Carrito />, { wrapper: MemoryRouter });
    expect(getByText(carrito[0].producto.name)).toBeInTheDocument();
    //La cantidad del producto
    expect(getByText("5.00 €")).toBeInTheDocument();
    
   
});

test("carrito con varios productos iguales", async () => {
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
    añadirAlCarritoNuevoProducto(productos[0]);

    const carrito: ProductoCarrito[]=[
        {
            producto:productos[0],
            cantidad:2,
            precioTotal:5
        }
    ];

    const { getByText, container, getAllByRole, getByTestId } = render(<Carrito />, { wrapper: MemoryRouter });
    expect(getByText(carrito[0].producto.name)).toBeInTheDocument();
    
    //let element=getAllByRole("button")[1];
    //fireEvent.click(element);
    console.log(getByTestId("cantidad-producto").textContent);
    expect(getByText("10.00 €")).toBeInTheDocument();
    expect(getByTestId("cantidad-producto").textContent).toEqual("- 3 +");
    //La cantidad del producto
    //expect(container).toHaveTextContent("1");
    
    //Aumentamos las cantidades con el metodo que usamos al pulsar +
    //añadirAlCarrito(carrito[0]);
   
});