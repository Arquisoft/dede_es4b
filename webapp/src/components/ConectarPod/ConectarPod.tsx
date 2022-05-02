import ButtonPod from '../pod/ButtonPod';
import { useSession } from '@inrupt/solid-ui-react';

const ConectarPod = () => {
    const { session } = useSession();

    session.onLogin(()=>{
        sessionStorage.setItem("podSession", JSON.stringify(session));
    })

    return (
        <div className='flex flex-col'>
            <h3 className="m-auto text-lg leading-6 font-medium text-gray-900 py-2">Conecta tu Pod de Solid para continuar</h3>
            <div className='m-auto p-2'>
            <ButtonPod urlProvider='https://inrupt.net' />

            </div>
        </div>
    );
}

export default ConectarPod