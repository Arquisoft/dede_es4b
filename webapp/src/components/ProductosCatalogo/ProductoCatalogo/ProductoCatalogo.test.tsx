import { render} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductoCatalogo from './ProductoCatalogo';

test("Products have the correct href to theirs details", async () => {
    const productos : any[] = [
        {_id: "id1", name: "Producto 1"},
        {_id: "id2", name: "Producto 2"},
        {_id: "id3", name: "Producto 3"}
    ];
    

    productos.forEach(p => {
        const {getByRole, unmount} = render(<ProductoCatalogo producto={p}/>, { wrapper: MemoryRouter })
        const link = getByRole("link");
        expect(link).toHaveAttribute("href", "/productos/" + p._id);
        unmount();
    });
    
});