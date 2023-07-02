import React from 'react';
import NavBar from './modules/layout/NavBar';
import Auth from './modules/Auth';
import Programmes from './modules/programme/Programmes';

const ProgrammesPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <NavBar name="navbar-home"></NavBar>
            <Programmes></Programmes>
        </div>
    )
}
export default ProgrammesPage;
