import { XIcon } from '@heroicons/react/outline';
import { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const SignUp = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const [errorDisplay, setErrorDisplay] = useState("hidden");

    const handleSumbit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (comprobarDatos()) {
            await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                body: JSON.stringify({ name, surname, userName: email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        navigate("/productos")
                    } else {
                        console.log("No se ha creado la cuenta. Error: " + e)
                        setErrorDisplay("flex");
                    }
                })
                .catch(e => console.log("No se ha creado la cuenta. Error: " + e));
        } else {
            console.log("Las constraseñas no coinciden");
        }
    };

    const comprobarDatos = (): boolean => {
        return password === confirmPassword;
    }

    return (
        <>
            <div className={errorDisplay + " absolute right-10 top-10 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow "}>
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
                    <XIcon />
                </div>
                <div className="ml-3 text-sm font-normal">Error, el usuario ya existe</div>
                <button onClick={() => setErrorDisplay("hidden")} className="ml-auto -mx-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 " data-dismiss-target="#toast-danger" aria-label="Close">
                    <span className="sr-only">Cerrar</span>
                    <XIcon />
                </button>
            </div>
            <div className="max-w-screen-xl px-4 py-16 mx-auto ">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-6xl font-bold text-center text-indigo-600">Registro</h1>

                    <form onSubmit={handleSumbit} method="POST" className="p-8 mt-6 mb-0 space-y-4 rounded-md border border-gray-300 shadow-sm">
                        <p className="text-lg font-medium">Rellene los siguientes campos</p>
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                                <input
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    id="name"
                                    className="w-full p-4 text-sm rounded-md border border-gray-300 shadow-sm"
                                    placeholder="Introduce tu nombre"
                                    required
                                />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="surname" className="text-sm font-medium">Apellidos</label>
                                <input
                                    onChange={e => setSurname(e.target.value)}
                                    type="text"
                                    id="surname"
                                    className="w-full p-4 text-sm rounded-md border border-gray-300 shadow-sm"
                                    placeholder="Introduce tu apellido"
                                    required
                                />
                            </div>
                        </div>
                        <div className="relative mt-1">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full p-4 text-sm rounded-md border border-gray-300 shadow-sm"
                                placeholder="Introduce tu email"
                                required
                            />
                        </div>

                        <div className='flex gap-4'>
                            <div className=" mt-1 w-1/2">
                                <label htmlFor="password" className="text-sm font-medium">Constraseña</label>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    className="w-full p-4 text-sm rounded-md border border-gray-300 shadow-sm"
                                    placeholder="Introduce una contraseña"
                                    required
                                    autoComplete="true"
                                />
                            </div>
                            <div className="mt-1 w-1/2">
                                <label htmlFor="passwordConfirm" className="text-sm font-medium">Confirmación constraseña</label>
                                <input
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    type="password"
                                    id="passwordConfirm"
                                    className="w-full p-4 text-sm rounded-md border border-gray-300 shadow-sm"
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
        </>

    )
};

export default SignUp;