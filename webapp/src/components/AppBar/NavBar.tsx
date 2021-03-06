import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { isLogeado } from '../../App';
import Catalogo from '../../pages/Catalogo';
import { getProductos } from '../../api/api';

const NavBar = () => {

    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Catalogo', href: '/productos', current: false },
        { name: 'Ropa', href: '/productos/categorias/ropa', current: false },
        { name: 'Calzado', href: '/productos/categorias/calzado', current: false },
        { name: 'Accesorios', href: '/productos/categorias/accesorios', current: false },
    ]

    const comprobarCatalogo = (item: any) => {
        if (item.name === "Catalogo")
            Catalogo.call(getProductos());
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    // Cortesía de tailwindui.com
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block h-10 w-auto mr-2 "
                                src='https://dedethlon.francecentral.cloudapp.azure.com:3000/images/logo.png'
                                alt="Workflow"
                            />
                            <h3 className="text-2xl tracking-tight font-extrabold text-purple-700">
                                DEDETHLON
                            </h3>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'px-3 py-2 rounded-md text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        onChange={() => comprobarCatalogo(item)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Link
                            to="/carrito"
                            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Ver carrito</span>
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>

                        {isLogeado() ?
                            (
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Opciones de usuario</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src='https://dedethlon.francecentral.cloudapp.azure.com:3000/images/user_icon.png'
                                                alt="user_icon"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right z-20  absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/pedidos"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Mis pedidos
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/logout"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Cerrar sesión
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (<div className="md:flex items-center justify-end">
                                <Link to="/login" className="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:text-purple-500">
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/signup"
                                    className="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Registrarme
                                </Link>
                            </div>)
                        }
                    </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as={Link}
                            to={item.href}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block px-3 py-2 rounded-md text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
};
export default NavBar;
