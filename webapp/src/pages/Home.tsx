import { Button } from '@mui/material';
import './dist/styles.css'

const Home = () => {

    return(
        <>
            <header>
                <div className="bienvenida">
                    <h1>¡Bienvenido/a!</h1>
                </div>
            </header>
            <div className="empezar">
                <h2>¿Por dónde quieres empezar?</h2>
            </div>
            <div className="botones">
                <div className="botonLogin"> 
                    <Button href="/login" color="inherit">
                        Iniciar sesión
                    </Button>
                </div>
                <div className="botonCatalogo">
                    <Button href="/productos" color="inherit">
                        Ver catálogo de productos
                    </Button>
                </div>
            </div>
        </>
    );
};
export default Home;