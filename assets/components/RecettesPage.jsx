import React from 'react';
import NavBar from './modules/layout/NavBar';
import Auth from './modules/Auth';
import Recettes from './modules/recette/Recettes';

const RecettesPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <NavBar name="navbar-home"></NavBar>
            <h1>Découvrez de nouvelle recettes</h1>
            <Recettes></Recettes>
        </div>
    )
}
export default RecettesPage;
