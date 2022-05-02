import { render} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from "./NavBar";

test("Comprobar enlaces del navbar", async () => {



        const {getAllByRole} = render(<NavBar/>, { wrapper: MemoryRouter })

        //Al pulsar el boton home
        const link = getAllByRole("link")[0];
        expect(link).toHaveAttribute("href", "/");
        //Al pulsar el boton catalogo
        expect(getAllByRole("link")[1]).toHaveAttribute("href", "/productos");
        //Al pulsar el filtro ropa
        expect(getAllByRole("link")[2]).toHaveAttribute("href", "/productos/categorias/ropa");
        //Al pulsar el filtro Calzado
        expect(getAllByRole("link")[3]).toHaveAttribute("href", "/productos/categorias/calzado");
        //Al pulsar el filtro Accesorios
        expect(getAllByRole("link")[4]).toHaveAttribute("href", "/productos/categorias/accesorios");
        //Al pulsar el boton carrito
        expect(getAllByRole("link")[5]).toHaveAttribute("href", "/carrito");
        //Al pulsar el Inicio sesion
        expect(getAllByRole("link")[6]).toHaveAttribute("href", "/login");
        //Al pulsar el registrarte
        expect(getAllByRole("link")[7]).toHaveAttribute("href", "/signup");



});

