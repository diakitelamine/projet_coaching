import React, { useEffect } from 'react';
import Auth from './Auth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const Profil = () => {

    useEffect(() => {
        console.log(sessionStorage);
    }, [])

        
    return(
        <Auth></Auth>
    )
}

export default Profil;