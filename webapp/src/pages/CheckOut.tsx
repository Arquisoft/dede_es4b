import React, { useEffect, useState } from 'react';
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
import { calcularCostes } from '../api/api';
import NavBar from '../components/AppBar/NavBar';
import Modal from '../components/Modal/Modal';
import ModalError from '../components/Modal/ModalError';
import { Link } from 'react-router-dom';

const getCosteProductos = () => {
    let carritoStr = sessionStorage.getItem("carrito");
    if (carritoStr != null) {
        const carrito: any[] = JSON.parse(carritoStr);

        let precio = 0;
        carrito.map(producto => precio += producto.precioTotal);
        return precio;
    }
    return 0;
}

const CheckOut = () => {
    const session = getPodSession();

    const [error, setError] = useState<any>();
    const [showConfirmar, setShowConfirmar] = useState(false);

    const webId = session?.info.webId;
    const addressPredicate = "http://www.w3.org/2006/vcard/ns#hasAddress";
    const [direccion, setDireccion] = useState<any>(null);
    const { thing } = useThing(webId, webId);
    var urlAddress = thing?.predicates[addressPredicate]?.namedNodes![0];

    const [costePedido, setCostePedido] = useState(getCosteProductos());


    const getAddress = async () => {
        try {
            const dataset = await getSolidDataset(urlAddress!);

            const thing = getThing(dataset, urlAddress!)!;
            setDireccion({
                street1: getStringNoLocale(thing!, VCARD.street_address.iri),
                city: getStringNoLocale(thing!, VCARD.locality.iri),
                region: getStringNoLocale(thing!, VCARD.region.iri),
                zip: getStringNoLocale(thing!, VCARD.postal_code),
                country: "ESP",
            })
        } catch (e) {
            console.log("Se ha producido un error al obtener la dirección de Solid: " + e);
            setError({ titulo: "Error cálculo de costes", desc: "Se ha producido un error al obtener la dirección de Solid" })
        }
    };

    let [isOpen, setIsOpen] = useState(true)
    function closeModal() {
        if (session != null)
            setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModalConfirmar() {
    }

    function openModalConfirmar() {
        setShowConfirmar(true)
    }

    useEffect(() => {
        if (thing != null) {
            if (direccion == null)
                getAddress();
            else
                calcularCostes(direccion)
                    .then(costeEnvio => {
                        setCostePedido(+costePedido + +costeEnvio)
                    })
                    .catch((e) => { console.log(e); setError({ titulo: "Error cálculo de costes", desc: "Se ha producido un error en el cáclulo de costes" }) });
        }

    }, [thing, direccion])

    return (
        <>
            <NavBar />
            {session != null ? (
                <div className="m-auto w-fit">
                    <DeliveryInfo direccion={direccion} webId={webId} costePedido={costePedido} />
                    <div className="relative my-4">
                        <button onClick={() => setShowConfirmar(true)}
                            type="button"
                            className="absolute right-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>

            ) :
                <Modal openModal={openModal} closeModal={closeModal} isOpen={isOpen}>
                    <ConectarPod />
                </Modal>
            }
            {
                error != null && <ModalError titulo={error.titulo} desc={error.desc} />
            }
            {
                showConfirmar && <Modal isOpen={showConfirmar} closeModal={closeModalConfirmar} openModal={openModalConfirmar}>
                    <div className='flex'>
                        <p>El pedido se ha confirmado correctamente.</p>
                        <Link to="/productos"
                            type="button"
                            className="right-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Volver al catálogo
                        </Link>
                    </div>

                </Modal>
            }
        </>
    );
};

export default CheckOut;