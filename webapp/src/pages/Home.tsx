import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <section className="text-white bg-gray-900">
            <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                        Bienvenido a Dedethlon!
                        <span className="sm:block">
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
                        Tú tienda online de deportes que respeta tus privacidad gracias a SOLID.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Link to="/productos" className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 block w-full px-12 py-3 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring">
                            Catálogo
                        </Link>

                        <Link to="/login" className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-violet-700 block w-full px-12 py-3 text-sm font-medium text-white border border-indigo-600 rounded sm:w-auto active:bg-indigo-500  focus:outline-none focus:ring">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Home;