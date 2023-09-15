import React from 'react';
import NavBar from './modules/layout/NavBar';
import AuthCoach from './modules/AuthCoach';
import Auth from './modules/Auth';
import Recettes from './modules/recette/Recettes';

const RecettesProfilPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <AuthCoach></AuthCoach>
            <NavBar name="navbar-home"></NavBar>
            <Recettes myRecette="1"></Recettes>
        </div>
    )
}
export default RecettesProfilPage;
