import React from 'react';
import NavBar from './modules/NavBar';
import Profil from './modules/Profil';
import Auth from './modules/Auth';

const ProfilPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <NavBar name="navbar-home"></NavBar>
            <Profil></Profil>
        </div>
    )
}
export default ProfilPage;
