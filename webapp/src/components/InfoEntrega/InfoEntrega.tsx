import { CombinedDataProvider, Text } from '@inrupt/solid-ui-react';
import { VCARD } from "@inrupt/lit-generated-vocab-common";

const DeliveryInfo = ({ direccion, webId, costePedido }: any) => {

    return (
        <span className="sm:ml-3">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">INFORMACIÓN DE ENTREGA</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <CombinedDataProvider datasetUrl={webId!} thingUrl={webId!}>

                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Nombre y apellidos</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{<Text property={VCARD.fn.iri.value} />}</dd>
                            </div>
                        </CombinedDataProvider>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Dirección de envío</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{direccion?.street1}</dd>
                        </div>
                        <div className='flex' >
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Ciudad</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {direccion?.city + " "}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Código postal</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{direccion?.zip}</dd>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Coste total</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{costePedido} €</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </span>
    );
};

export default DeliveryInfo;