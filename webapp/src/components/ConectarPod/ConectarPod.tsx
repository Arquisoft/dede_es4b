import React from 'react';
import ButtonPod from '../pod/ButtonPod';
import { useSession } from '@inrupt/solid-ui-react';

const ConectarPod = () => {
    const { session } = useSession();

    session.onLogin(()=>{
        sessionStorage.setItem("podSession", JSON.stringify(session));
    })

    return (
        <>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Conecta tu Solid Pod para continuar</h3>
            </div>
            <ButtonPod urlProvider='https://inrupt.net' />
        </>
    );
}

export default ConectarPod