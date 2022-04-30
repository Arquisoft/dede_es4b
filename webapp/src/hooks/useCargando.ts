import { useState } from 'react'

const useCargando = (texto: string) => {
    const [cargando, setCargando] = useState(false);
    const [cargandoTexto, setCargandoTexto] = useState(texto);
    return [cargando, cargandoTexto,setCargando , setCargandoTexto];
}

export default useCargando;