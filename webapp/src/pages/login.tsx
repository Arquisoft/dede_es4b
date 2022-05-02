import { BaseSyntheticEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AtSymbolIcon, EyeIcon, EyeOffIcon, XIcon } from '@heroicons/react/outline'
import { postLogin } from '../api/api';

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

    const [tipo, setTipo] = useState('password')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorDisplay, setErrorDisplay] = useState("hidden");

    /**
     * Permite mostrar la contraseña
     */
    const cambiarVisibilidad = () => {
        if (tipo === 'password')
            setTipo("text")
        else
            setTipo("password")
    }

    const handleSumbit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        // llamada al backend
        await postLogin(email, password)
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response?.ok) {
                    response.json().then(
                        data => {
                            setUserSession({ userName: data.userName, token: data.token })

                            navigate(previousLocation || "/productos");
                        }
                    );
                }
                else {
                    setErrorDisplay("flex")
                }
            });
    };

    return (
        <>
            <div className={errorDisplay + " absolute right-10 top-10 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow "}>
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
                    <XIcon />
                </div>
                <div className="ml-3 text-sm font-normal">No exite el usuario. Vuelta a intentarlo</div>
                <button onClick={() => setErrorDisplay("hidden")} className="ml-auto -mx-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 " data-dismiss-target="#toast-danger" aria-label="Close">
                    <span className="sr-only">Cerrar</span>
                    <XIcon />
                </button>
            </div>
            <div className="max-w-screen-xl px-4 py-16 mx-auto ">

                <div className="max-w-lg mx-auto">
                    <h1 className="text-6xl font-bold text-center text-indigo-600">Inicie sesión</h1>

                    <form onSubmit={handleSumbit} method="POST" className="p-8 mt-8 mb-0 space-y-4 rounded-md border border-gray-300 shadow-sm">
                        <p className="text-lg font-medium">Introduce tus datos</p>

                        <div>
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <div className="relative mt-1 rounded-md border border-gray-300 shadow-sm">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
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
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-medium">Constraseña</label>

                            <div className="relative mt-1 rounded-md border border-gray-300 shadow-sm">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={tipo}
                                    id="password"
                                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="Enter password"
                                    required
                                />

                                <span className="absolute inset-y-0 inline-flex items-center right-4">
                                    <button type='button' onClick={() => cambiarVisibilidad()}>
                                        {
                                            tipo === "password" ?
                                                (<EyeIcon className="w-5 text-zinc-400" />) : (<EyeOffIcon className="w-5 text-zinc-400" />)
                                        }
                                    </button>
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                            Continuar
                        </button>

                        <p className="text-sm text-center ">
                            ¿Sin cuenta?
                            <Link className="underline" to="/signup">Regístrate aquí</Link>
                        </p>
                    </form>

                </div>
            </div>
        </>

    )
}

export default Login