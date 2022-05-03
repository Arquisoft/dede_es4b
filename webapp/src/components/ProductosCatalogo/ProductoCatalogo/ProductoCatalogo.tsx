import { Producto } from '../../../shared/shareddtypes';
import { Link } from 'react-router-dom';

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
            <div className="mt-2 flex flex-col overflow-hidden h-20">
                <h3 className="text-lg font-medium text-gray-700">
                    <Link to={"/productos/" + producto._id}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {producto.name}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500  overflow-hidden">{producto.short_description}</p>
            </div>
            <p className="text-base font-medium text-yellow-700">{producto.price}€</p>

        </div>
        
    )
};

export default ProductoCatalogo;