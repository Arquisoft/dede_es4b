import React, { useLayoutEffect, useState } from 'react';
import DeliveryInfo from '../components/InfoEntrega/InfoEntrega';
import { getPodSession } from '../App';
import ConectarPod from '../components/ConectarPod/ConectarPod';
import { VCARD } from "@inrupt/lit-generated-vocab-common";
import {
    getStringNoLocale,
    getSolidDataset,
    getThing
} from "@inrupt/solid-client";
import { useThing } from '@inrupt/solid-ui-react';

const CheckOut = () => {
    const session = getPodSession();

    const webId = session?.info.webId;
    const addressPredicate = "http://www.w3.org/2006/vcard/ns#hasAddress";
    const [direccion, setDireccion] = useState<any>(null);
    const { thing, error } = useThing(webId, webId);
    var urlAddress = thing?.predicates[addressPredicate].namedNodes![0];
    const [costePedido, setCostePedido] = useState(0);


    const getAddress = async () => {
        const dataset = await getSolidDataset(urlAddress!);
        const thing = getThing(dataset, urlAddress!)!;
        setDireccion({
            street1: getStringNoLocale(thing!, VCARD.street_address.iri),
            city: getStringNoLocale(thing!, VCARD.locality.iri),
            zip: getStringNoLocale(thing!, VCARD.postal_code),
            country: "ESP",
        })
    };

    const calcularCostes = async () => {
        let response = await fetch("http://localhost:5000/product/shippementCost", {
            method: 'POST',
            body: JSON.stringify(direccion),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let responseJSON = await response.json();
            setCostePedido(responseJSON.coste);
        } else{
            console.log(response);
            setCostePedido(-10);
        }
    };

    useLayoutEffect(() => {
        if (thing != null) {
            if (direccion == null)
                getAddress();
            calcularCostes();
        }

    }, [thing])

    return (
        <>
            {session != null ? (
                <>
                    <DeliveryInfo direccion={direccion} webId={webId} costePedido={costePedido} />
                    <button onClick={() => alert("TEMPORAL: Pedido creado")}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Confirmar
                    </button>
                </>

            ) :
                <ConectarPod />
            }
        </>
    );
};

export default CheckOut;