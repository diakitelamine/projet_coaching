import React, { useEffect } from 'react';
import Auth from './Auth';
const Profil = () => {

    useEffect(() => {
        console.log(sessionStorage);
    }, [])

        
    return(
        <div>
            <Auth></Auth>
            <p>Page profil</p>
        </div>
    )
}

export default Profil;