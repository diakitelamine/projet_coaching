import React from 'react';
import NavBar from './modules/layout/NavBar';
import AuthCoach from './modules/AuthCoach';
import Auth from './modules/Auth';

const ProgrammesProfilPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <AuthCoach></AuthCoach>
            <NavBar name="navbar-home"></NavBar>
        </div>
    )
}
export default ProgrammesProfilPage;
