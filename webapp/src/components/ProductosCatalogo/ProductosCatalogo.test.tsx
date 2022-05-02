import { render, fireEvent } from '@testing-library/react';
import ProductosCatalogo from './ProductosCatalogo';
import { MemoryRouter } from 'react-router-dom';



test("products are displayed", async () => {

    const productos: any[] = [
        { _id: "1", name: "p1", price: 10.55 },
        { _id: "2", name: "p2", price: 40 },
        { _id: "3", name: "p3", price: 3.5 },
        { _id: "4", name: "p4", price: 2.01 },
        { _id: "5", name: "p5", price: 40 }
    ]

    // wrapper necesarios: https://stackoverflow.com/questions/70805929/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-compon
    const { getByText } = render(<ProductosCatalogo productos={productos} />, { wrapper: MemoryRouter })

    productos.map(p => expect(getByText(p.name)).toBeInTheDocument());
});

test("when 'ordenar por precio ascendente' is clicked, products are sorted by ascending price", async () => {

    const productos: any[] = [
        { _id: "1", price: 10.55 },
        { _id: "2", price: 40 },
        { _id: "3", price: 3.5 },
        { _id: "4", price: 2.01 },
        { _id: "5", price: 40 }
    ];
    const pricesSorted = ["2.01€", "3.5€", "10.55€", "40€", "40€"];

    // wrapper necesarios: https://stackoverflow.com/questions/70805929/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-compon
    const { container, getByRole, findByText } = render(<ProductosCatalogo productos={productos} />, { wrapper: MemoryRouter });
    const sortBtn = getByRole("button");

    // Pulsamos el botón que muestra las opciones
    fireEvent.click(sortBtn);

    // Buscamos y pulsamos el botón de ordenar por precio ascendente
    const sortAscBtn = await findByText("Precio ascendente");
    fireEvent.click(sortAscBtn);

    // Comprobamos que el catálogo tiene el orden adecuado
    const grid = container.childNodes[0].childNodes[2].childNodes;
    grid.forEach((p, i) => expect(p).toHaveTextContent(pricesSorted[i]));
});

test("when 'ordenar por precio descendente' is clicked, products are sorted by descending price", async () => {

    const productos: any[] = [
        { _id: "1", price: 10.55 },
        { _id: "2", price: 40 },
        { _id: "3", price: 3.5 },
        { _id: "4", price: 2.01 },
        { _id: "5", price: 40 }
    ];
    const pricesSorted = ["40€", "40€", "10.55€", "3.5€", "2.01€"];

    // wrapper necesarios: https://stackoverflow.com/questions/70805929/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-compon
    const { container, getByRole, findByText } = render(<ProductosCatalogo productos={productos} />, { wrapper: MemoryRouter });
    const sortBtn = getByRole("button");

    // Pulsamos el botón que muestra las opciones
    fireEvent.click(sortBtn);

    // Buscamos y pulsamos el botón de ordenar por precio descendiente
    const sortDescBtn = await findByText("Precio descendiente");
    fireEvent.click(sortDescBtn);

    // Comprobamos que el catálogo tiene el orden adecuado
    const grid = container.childNodes[0].childNodes[2].childNodes;
    grid.forEach((p, i) => expect(p).toHaveTextContent(pricesSorted[i]));
});