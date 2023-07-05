import React from 'react';
import Coachs from './modules/coach/Coachs';
import NavBar from './modules/layout/NavBar';

const CoachsPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <h1>Découvrez nos coachs</h1>
            <Coachs></Coachs>
        </div>
    )
}
export default CoachsPage;
