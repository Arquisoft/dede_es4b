import { render,fireEvent, screen, getByLabelText, getByTestId, getAllByTestId } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {añadirAlCarrito, añadirAlCarritoNuevoProducto, eliminarAlCarrito, getCarrito} from "../../util/carrito";
import { ProductoCarrito } from "../../shared/shareddtypes";
import { Producto } from '../../shared/shareddtypes';
import ProductosCatalogo from "../ProductosCatalogo/ProductosCatalogo";
import Carrito from "./Carrito";

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
            size: "0"
    },
    {
        _id: "2",
        name: "Raqueta",
        price: 35,
        short_description: "Raqueta de tenis",
        long_description: "Es uns raqueta para jugar al tenis, azul",
        brand: "no marca",
        category: "tenis",
        sub_category: "accesorio",
        image: "no imagen",
        type: "raqueta",
        color: "azul",
        size: "0"
    },
    {
        _id: "3",
        name: "Bañador",
        price: 20,
        short_description: "Bañador",
        long_description: "Es un bañador para jugar al futbolnatacion, blanco y negro",
        brand: "Adidas",
        category: "Natacion",
        sub_category: "Ropa",
        image: "no imagen",
        type: "Bañador",
        color: "blanco y negro",
        size: "M"
    }
]

test("carrito con un producto con varias unidades aumentadas en carrito", async () => {
    //Desde el producto
    añadirAlCarritoNuevoProducto(productos[0],"0");
    

    const carrito: ProductoCarrito[]=[
        {
            producto:productos[0],
            cantidad:1,
            precioTotal:5
        }
    ];

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const components=render(<Carrito />, { wrapper: MemoryRouter });
    expect(screen.getByText(carrito[0].producto.name)).toBeInTheDocument();
    //La cantidad del producto
    expect(screen.getByText("5.00 €")).toBeInTheDocument();
    expect(screen.getByTestId("cantidad-producto").textContent).toEqual("- 1 +");

   
    //Reproducimos el click sobre el boton +
    fireEvent.click(screen.getAllByRole("button")[1]);
    components.rerender(<Carrito />);
    expect(screen.getByText("10.00 €")).toBeInTheDocument();
    expect(screen.getByTestId("cantidad-producto").textContent).toEqual("- 2 +");
    

    //Reproducimos el click sobre el boton +
    fireEvent.click(screen.getAllByRole("button")[1]);
    components.rerender(<Carrito />);
    expect(screen.getByText("15.00 €")).toBeInTheDocument();
    expect(screen.getByTestId("cantidad-producto").textContent).toEqual("- 3 +");

    //Reproducimos el click sobre el boton -
    fireEvent.click(screen.getAllByRole("button")[0]);
    components.rerender(<Carrito />);
    expect(screen.getByText("10.00 €")).toBeInTheDocument();
    expect(screen.getByTestId("cantidad-producto").textContent).toEqual("- 2 +");

});

test("carrito con varios productos iguales", async () => {
   

    //Ya añadidos dos balones, añadimos dos productos distintos mas
    añadirAlCarritoNuevoProducto(productos[1],"0");
    añadirAlCarritoNuevoProducto(productos[2],"M");
    const carrito: ProductoCarrito[]=[
        {
            producto:productos[0],
            cantidad:2,
            precioTotal:10
        },
        {
            producto:productos[1],
            cantidad:1,
            precioTotal:35
        },
        {
            producto:productos[2],
            cantidad:1,
            precioTotal:25
        }
    ];

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const components=render(<Carrito />, { wrapper: MemoryRouter });
    expect(screen.getByText(carrito[0].producto.name)).toBeInTheDocument();
    expect(screen.getByText("10.00 €")).toBeInTheDocument();
    expect(screen.getByText(carrito[1].producto.name)).toBeInTheDocument();
    expect(screen.getByText("35.00 €")).toBeInTheDocument();
    expect(screen.getByText(carrito[2].producto.name)).toBeInTheDocument();
    expect(screen.getByText("20.00 €")).toBeInTheDocument();

    //Reproducimos el click sobre el boton remove del primer producto
    expect(getCarrito().length).toEqual(3);
    fireEvent.click(screen.getAllByRole("button")[2]);
    components.rerender(<Carrito />);
    expect(getCarrito().length).toEqual(2);
    expect(screen.getByText(carrito[1].producto.name)).toBeInTheDocument();
    expect(screen.getByText("35.00 €")).toBeInTheDocument();
    expect(screen.getByText(carrito[2].producto.name)).toBeInTheDocument();
    expect(screen.getByText("20.00 €")).toBeInTheDocument();

    //Pulsamos boton - sobre un producto con una unidad
    expect(getCarrito().length).toEqual(2);
    fireEvent.click(screen.getAllByRole("button")[0]);
    components.rerender(<Carrito />);
    expect(getCarrito().length).toEqual(1);
    expect(screen.getByText(carrito[2].producto.name)).toBeInTheDocument();
    expect(screen.getByText("20.00 €")).toBeInTheDocument();
});