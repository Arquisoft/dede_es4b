import React from 'react'
import {Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import './login.css'

const Login = () => {
    return (
        <div>
            <Typography  variant='h2' gutterBottom>Inicie sesión</Typography>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <TextField label="Usuario" variant="outlined" margin="dense"></TextField>
                <TextField type="password" label="Contraseña" variant="outlined" margin="dense"></TextField>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5em' }}>
                    <FormControlLabel control={<Checkbox />} label="Recordar" />
                    <Button variant="contained">Login</Button>  
                </div>
            </div>
            <Typography style={{justifyContent: 'end'}}  variant='h6' gutterBottom>¿Sin cuenta? Regístrate <a href='/signup'>aquí</a></Typography>
        </div>
    )
}

export default Login