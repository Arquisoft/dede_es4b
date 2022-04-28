import { AtSymbolIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import React, { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';



const SignUp = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInput = (e: BaseSyntheticEvent) => {

    }

    const handleSumbit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (comprobarDatos()) {
            await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                body: JSON.stringify({ name, surname, userName, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => console.log("Registro completado"))
            .catch(e => console.log("No se ha creado la cuenta. Error: " + e));
        } else {
            console.log("Las constraseñas no coinciden");
        }
    };

    const comprobarDatos = (): boolean => {
        return password == confirmPassword;
    }

    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto ">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-6xl font-bold text-center text-indigo-600">Registro</h1>

                <form onSubmit={handleSumbit} method="POST" className="p-8 mt-6 mb-0 space-y-4">
                    <p className="text-lg font-medium">Rellene los siguientes campos</p>
                    <div className='flex justify-between'>
                        <div>
                            <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                            <input
                                onChange={e => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Introduce tu nombre"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="surname" className="text-sm font-medium">Apellido</label>
                            <input
                                onChange={e => setSurname(e.target.value)}
                                type="text"
                                id="surname"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Introduce tu apellido"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="userName" className="text-sm font-medium">Nombre de usuario</label>
                        <input
                            onChange={e => setUserName(e.target.value)}
                            type="text"
                            id="userName"
                            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="Introduce tu nombre"
                            required
                        />
                    </div>
                    <div className="relative mt-1">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="Introduce tu email"
                            required
                        />
                    </div>

                    <div className='flex justify-between'>
                        <div className="relative mt-1">
                            <label htmlFor="password" className="text-sm font-medium">Constraseña</label>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Introduce una contraseña"
                                required
                                autoComplete="true"
                            />
                        </div>
                        <div className="relative mt-1">
                            <label htmlFor="passwordConfirm" className="text-sm font-medium">Constraseña</label>
                            <input
                                onChange={e => setConfirmPassword(e.target.value)}
                                type="password"
                                id="passwordConfirm"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Repite la contraseña"
                                required
                                autoComplete="true"
                            />
                        </div>
                    </div>

                    <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                        Continuar
                    </button>

                    <p className="text-sm text-center ">
                        ¿Ya tienes cuenta?
                        <Link className="underline" to="/login">Inicia sesión aquí</Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default SignUp;