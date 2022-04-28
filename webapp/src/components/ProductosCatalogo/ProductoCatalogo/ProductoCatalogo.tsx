import React from 'react';
import { Producto, ProductoCarrito } from '../../../shared/shareddtypes';
import { Link } from 'react-router-dom';


// Guarda el producto en la sesión.
const añadirAlCarrito = (producto: any) => {
    const carritoString = sessionStorage.getItem('carrito');
    let carrito = [];
    if (carritoString != null)
        carrito = JSON.parse(carritoString!);
    //let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };    

    let borrar = -1;
    let c = 0;
    let p = 0;
    carrito.forEach(function (value: any, index: any) {

        if (value.producto._id === producto._id) {
            borrar = index;
            c = value.cantidad;

        }
    });


    if (borrar >= 0) {
        let productoCarrito: ProductoCarrito = { producto: producto, cantidad: c + 1, precioTotal: parseFloat(producto.price) * c };

        carrito.splice(borrar, 1, productoCarrito);
    } else {
        let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };
        carrito.push(productoCarrito);
    }

    sessionStorage.setItem('carrito', JSON.stringify(carrito))
}

const ProductoCatalogo = ({ producto }: { producto: Producto }) => {

    return (
        <div key={producto._id} className="group grid grid-rows-[20rem_6rem_1rem] relative h-92 max-h-92">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={producto.image}
                    alt={"Imagen de " + producto.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-4 flex justify-between min-h-max h-50">
                <div>
                    <h3 className="text-lg font-medium text-gray-700 te">
                        <Link to={"/productos/" + producto._id}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {producto.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 overflow-hidden">{producto.short_description}</p>
                </div>
            </div>
            <p className="flex text-base font-medium text-yellow-700">{producto.price}€</p>

        </div>
        
    )
};

export default ProductoCatalogo;