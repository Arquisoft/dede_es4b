import React, { useEffect, useState } from 'react';
import DeliveryInfo from '../components/InfoEntrega/InfoEntrega';
import { getPodSession } from '../App';
import ConectarPod from '../components/ConectarPod/ConectarPod';

const CheckOut = () => {
    // const { session } = useSession();
    const [coste, setCoste] = useState(0);
    const session = getPodSession();
    const [isLogeado, setLogeado] = useState(session != null);
    
    return (
        <>
            {isLogeado ?  (
                <>
                    <DeliveryInfo coste={0} />
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Confirmar
                    </button>
                </>

            ) :
                <ConectarPod setLogeado={setLogeado}/>
            }
        </>
    );
};

export default CheckOut;