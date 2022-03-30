import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { isLogeado } from '../App'

function setToken(userToken: any) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
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
            case "username":
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
        }
    }

    const handleSumbit = async (e: BaseSyntheticEvent) => {
        comprobarDatos(e);

        // TODO
        // llamada al backend
        if (password === '12345') {
            const token = "token123"
            if (token != null) {
                setToken(token);
                navigate("/productos");
            }
        }
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
            <form onSubmit={handleSumbit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField label="Usuario" name='username' onChange={handleInput} helperText={validationUsername} variant="outlined" margin="dense" autoComplete="true"></TextField>
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