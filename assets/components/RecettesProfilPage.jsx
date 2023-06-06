import React from 'react';
import NavBar from './modules/NavBar';
import AuthCoach from './modules/AuthCoach';
import Auth from './modules/Auth';
import RecettesProfil from './modules/RecettesProfil';

const RecettesProfilPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <AuthCoach></AuthCoach>
            <NavBar name="navbar-home"></NavBar>
            <RecettesProfil></RecettesProfil>
        </div>
    )
}
export default RecettesProfilPage;
