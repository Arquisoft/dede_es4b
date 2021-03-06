import { useEffect, useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";

const ButtonPod = ({urlProvider} : {urlProvider : string}) => {
    const [idp] = useState(urlProvider);
    const [currentUrl, setCurrentUrl] = useState(process.env.REACT_APP_API_URI || "https://localhost:3000");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [setCurrentUrl]
    );

    return (
        <LoginButton oidcIssuer={idp} redirectUrl={currentUrl} >
            <button
                type="submit"
                className=" inline-flex justify-center p-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Conectar al POD
            </button>
        </LoginButton>
    )
}

export default ButtonPod;