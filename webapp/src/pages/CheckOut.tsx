import { useEffect, useState } from 'react';
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
import { calcularCostes, realizarPedido } from '../api/api';
import NavBar from '../components/AppBar/NavBar';
import Modal from '../components/Modal/Modal';
import ModalError from '../components/Modal/ModalError';
import { Link } from 'react-router-dom';
import { getProductosIndividualesCarrito, vaciarCarrito } from '../util/carrito';
import { DireccionType } from '../shared/shareddtypes';
import Cargando from '../components/Cargando/Cargando';

const getCosteProductos = () => {
    let carritoStr = sessionStorage.getItem("carrito");
    if (carritoStr != null) {
        const carrito: any[] = JSON.parse(carritoStr);

        let precio = 0;
        carrito.forEach(producto => precio += producto.precioTotal);
        return precio;
    }
    return 0;
};


const formatAddress = (address: DireccionType): string => {
    return `${address.street1} ZIP: ${address.zip} ${address.city}, ${address.region}`
}

const comprobarDireccionSolid = (direccion: DireccionType): boolean => {
    if (!direccion.city || direccion.city.length === 0)
        return false;
    if (!direccion.country || direccion.country.length === 0)
        return false;
    if (!direccion.region || direccion.region.length === 0)
        return false;
    if (!direccion.street1 || direccion.street1.length === 0)
        return false;
    if (!direccion.zip || direccion.zip.length === 0)
        return false;

    return true;
}

const CheckOut = () => {
    const session = getPodSession();

    const [error, setError] = useState<any>();
    const [mostrarPedidoCorrecto, setMostrarPedidoCorrecto] = useState(false);
    const [mostrarConectarPod] = useState(session == null);
    const [cargando, setCagando] = useState(false);
    const [cargandoTexto, setCargandoTexto] = useState("Cargando contenido");

    const webId = session?.info.webId;
    const addressPredicate = "http://www.w3.org/2006/vcard/ns#hasAddress";
    const [direccion, setDireccion] = useState<DireccionType>();
    const { thing } = useThing(webId, webId);
    var urlAddress = thing?.predicates[addressPredicate]?.namedNodes![0];

    const [costePedido, setCostePedido] = useState(getCosteProductos());

    const finalizarPedido = () => {
        setCagando(true);
        setCargandoTexto("Confirmando pedido. Espere por favor");
        const productos = getProductosIndividualesCarrito();

        const userSessionStr = sessionStorage.getItem('userSession');
        const userSession = JSON.parse(userSessionStr!);

        realizarPedido(productos, formatAddress(direccion!), userSession.userName)
            .then(() => {
                setMostrarPedidoCorrecto(true);
                vaciarCarrito();
            })
            .catch(e => {
                console.log(e);
                setError({ titulo: "Error al realizar el pedido", desc: "No se ha podido confirmar el pedido" })
            }).finally(
                () => setCagando(false)
            );
    }


    const getAddress = async () => {
        try {
            const dataset = await getSolidDataset(urlAddress!);

            const thingAddress = getThing(dataset, urlAddress!)!;
            const direccionInfo: DireccionType = {
                street1: getStringNoLocale(thingAddress, VCARD.street_address.iri)!,
                city: getStringNoLocale(thingAddress, VCARD.locality.iri)!,
                region: getStringNoLocale(thingAddress, VCARD.region.iri)!,
                zip: getStringNoLocale(thingAddress, VCARD.postal_code)!,
                country: "ESP",
            }

            if (!comprobarDireccionSolid(direccionInfo))
                setError({ titulo: "Error en el cálculo de costes", desc: "El formato de la dirección no es correcto" })
            else
                setDireccion(direccionInfo)
        } catch (e) {
            console.log("Se ha producido un error al obtener la dirección de Solid: " + e);
            setError({ titulo: "Error cálculo de costes", desc: "Se ha producido un error al obtener la dirección de Solid" })
        }
    };


    useEffect(() => {
        setCagando(true);

        if (thing != null) {
            if (direccion == null)
                getAddress();
            else {
                calcularCostes(direccion)
                    .then(costeEnvio => {
                        setCostePedido(+costePedido + +costeEnvio)
                    })
                    .catch((e) => {
                        console.log(e);
                        setError({ titulo: "Error cálculo de costes", desc: "Se ha producido un error en el cáclulo de costes" });
                    })
                    .finally(() => setCagando(false));
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thing, direccion])

    if (!session)
        return (
            <Modal isOpen={mostrarConectarPod}>
                {!session && <ConectarPod />}
            </Modal>
        )
    
    return (
        <>
            <NavBar />
            {!cargando ? (
                <div className="m-auto w-fit">
                    <DeliveryInfo direccion={direccion} webId={webId} costePedido={costePedido} />
                    <div className="relative my-4">
                        <button onClick={finalizarPedido}
                            type="button"
                            className="absolute right-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>

            )  : 
                <Cargando cargando={cargando} cargandoTexto={cargandoTexto} />
            }
            {
                error != null && <ModalError titulo={error.titulo} desc={error.desc} />
            }
            <Modal isOpen={mostrarPedidoCorrecto}>
                <div className='flex flex-col'>
                    <p className='text-lg font-medium m-auto p-2'>¡El pedido se ha confirmado correctamente!</p>
                    <Link to="/productos"
                        type="button"
                        className="m-auto p-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Volver al catálogo
                    </Link>
                </div>

            </Modal>

        </>
    );
}

export default CheckOut;