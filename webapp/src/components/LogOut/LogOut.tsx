import React from 'react';

const LogOut = () => {

    sessionStorage.removeItem("userSession");

    return (
        <div className="inline-flex py-20 px-4 ">
            <h2 className="text-3xl py-3  px-4 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Cerrada la sesión</span>
            </h2>
            <a
                href="/"
                className="inline-flex items-center justify-center m-3 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Volver al home
            </a>
        </div>
    )
}

export default LogOut