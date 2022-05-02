import Modal from '../Modal/Modal';
import './style.css';

// https://loading.io/css/
const Cargando = ({ cargando, cargandoTexto }: { cargando : boolean, cargandoTexto : string }) => {
    return (
        <Modal isOpen={cargando}>
            <div className='flex flex-col'>
                <div className="m-auto p-4 lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                <p className="text-lg font-medium m-auto p-2">{cargandoTexto}</p>
            </div>
        </Modal>
    )
}

export default Cargando