import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const Auth = () => {
    //Si il n'est pas connecter
    if (!sessionStorage.getItem("id")) {
        //Redirige vers la page de connexion
        return(
            <Redirect to="/auth" />
            )
    }
    else{
        return(
            ''
        )
    }
    
}

export default Auth;