import React from 'react';
import {render} from '@testing-library/react';
import LogOut from './LogOut';

test("When user logs out, LogOut must show", async () => {

    // Simulamos que un usuario está logeado.
    let userSession = {username: "test1@test.com", token: "testToken"}
    sessionStorage.setItem("userSession", JSON.stringify(userSession));

    const {findByText} = render(<LogOut />)
    
    // Existe el text
    await findByText("Cerrada la sesión");

    // La sesión fue borrada
    expect(sessionStorage.getItem("userSession")).toStrictEqual(null);

})
