import React from 'react';
import NavBar from './modules/NavBar';
import Profil from './modules/Profil';

const ProfilPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <Profil></Profil>
        </div>
    )
}
export default ProfilPage;
