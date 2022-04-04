import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { isLogeado } from '../App'

function setUserSession(userSession: any) {
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
}

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogeado())
            navigate("/productos")
    }, [])

    const [tipo, setTipo] = useState('password')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationUsername, setValidationUsername] = useState('');
    const [validationPassword, setValidationPassword] = useState('');



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
        switch (e.target.name) {
            case "userName":
                setUsername(e.target.value);
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
            body: JSON.stringify({userName: username, password: password}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response?.ok){
                response.json().then(
                    data  => {
                        setUserSession({userName: data.userName, token: data.token})
                        navigate("/productos");
                    }
                ); 
            }
            else {
                console.log("No existe tal usuario")
            }
        });
    };

    const comprobarDatos = (e: BaseSyntheticEvent): void => {
        if (username.length <= 0)
            setValidationUsername("Name too short");
        if (password.length <= 0)
            setValidationPassword("Password too short");
    }

    return (
        <div>
            <Typography variant='h2' gutterBottom>Inicie sesión</Typography>
            <form onSubmit={handleSumbit} style={{ display: 'flex', flexDirection: 'column' }} method="POST" >
                <TextField label="Usuario" name='userName' onChange={handleInput} helperText={validationUsername} variant="outlined" margin="dense" autoComplete="true"></TextField>
                <TextField type={tipo} name="password" onChange={handleInput} helperText={validationPassword} label="Contraseña" variant="outlined" margin="dense" autoComplete="true"></TextField>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em' }}>
                    <FormControlLabel control={<Checkbox onChange={() => cambiarVisibilidad()} />} label="Mostrar" />
                    <Button type='submit' variant="contained">Iniciar sesión</Button>
                </div>
            </form>
            <Typography style={{ justifyContent: 'end' }} variant='h6' gutterBottom>¿Sin cuenta? Regístrate <a href='/signup'>aquí</a></Typography>
        </div>
    )
}

export default Login