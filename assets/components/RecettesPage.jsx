import React from 'react';
import NavBar from './modules/layout/NavBar';
import Auth from './modules/Auth';
import Recettes from './modules/recette/Recettes';

const RecettesPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <NavBar name="navbar-home"></NavBar>
            <Recettes></Recettes>
        </div>
    )
}
export default RecettesPage;
