import React from 'react';
import Coachs from './modules/Coach';
import NavBar from './modules/NavBar';

const CoachsPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <Coachs></Coachs>
        </div>
    )
}
export default CoachsPage;
