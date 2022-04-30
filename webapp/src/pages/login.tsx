import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isLogeado } from '../App'
import { AtSymbolIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

function setUserSession(userSession: any) {
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
}

interface CustomizedState {
    from: Location
  }

const Login = () => {
    const navigate = useNavigate();
    const state = useLocation().state as CustomizedState;
    const previousLocation = state?.from;
    useEffect(() => {
        if (isLogeado())
            navigate("/productos")
    }, [])

    const [tipo, setTipo] = useState('password')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(true);
    const [invalidPassword, setInvalidPassword] = useState(true);



    /**
     * Permite mostrar la contraseña
     */
    const cambiarVisibilidad = () => {
        if (tipo === 'password')
            setTipo("text")
        else
            setTipo("password")
    }

    const handleInput = (e: BaseSyntheticEvent) => {
        switch (e.target.id) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
        }
    }

    const handleSumbit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        comprobarDatos(e);

        // llamada al backend
        await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ userName: email, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response?.ok) {
                    response.json().then(
                        data => {
                            setUserSession({ userName: data.userName, token: data.token })

                            navigate(previousLocation);
                        }
                    );
                }
                else {
                    console.log("No existe tal usuario")
                }
            });
    };

    const comprobarDatos = (e: BaseSyntheticEvent): void => {
        if (email.length <= 0)
            setInvalidEmail(false);
        if (password.length <= 0)
            setInvalidPassword(false);
    }

    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto ">
            <div className="max-w-lg mx-auto">
                <h1 className="text-6xl font-bold text-center text-indigo-600">Inicie sesión</h1>

                <form onSubmit={handleSumbit} method="POST" className="p-8 mt-6 mb-0 space-y-4">
                    <p className="text-lg font-medium">Introduce tus datos</p>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <div className="relative mt-1">
                            <input
                                onChange={handleInput}
                                type="email"
                                id="email"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Enter email"
                                required
                            />
                            <span className="absolute inset-y-0 inline-flex items-center right-4">
                                <AtSymbolIcon className="w-5 text-zinc-400" />
                            </span>
                        </div>
                        <label className='text-sm text-red-700' hidden={invalidEmail}>
                            Email inválido
                        </label>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium">Constraseña</label>

                        <div className="relative mt-1">
                            <input
                                onChange={handleInput}
                                type={tipo}
                                id="password"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Enter password"
                                required
                            />

                            <span className="absolute inset-y-0 inline-flex items-center right-4">
                                <button type='button' onClick={() => cambiarVisibilidad()}>
                                    {
                                        tipo == "password" ?
                                            (<EyeIcon className="w-5 text-zinc-400" />) : (<EyeOffIcon className="w-5 text-zinc-400" />)
                                    }
                                </button>
                            </span>
                            <label className='text-sm text-red-700' hidden={invalidPassword}>
                                Contraseña no válida.
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                        Continuar
                    </button>

                    <p className="text-sm text-center ">
                        ¿Sin cuenta?
                        <a className="underline" href="/register">Regístrate aquí</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login