import React from 'react';
import NavBar from './modules/NavBar';
import AuthCoach from './modules/AuthCoach';
import Auth from './modules/Auth';
import RecettesProfil from './modules/RecettesProfil';
import RecetteNew from './modules/RecetteNew';

const RecetteNewPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <AuthCoach></AuthCoach>
            <NavBar name="navbar-home"></NavBar>
            <RecetteNew></RecetteNew>
        </div>
    )
}
export default RecetteNewPage;
