import React from 'react';
import NavBar from './modules/layout/NavBar';
import Auth from './modules/Auth';
import Programme from './modules/programme/Programme';

const ProgrammePage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <NavBar name="navbar-home"></NavBar>
            <Programme></Programme>
        </div>
    )
}
export default ProgrammePage;
