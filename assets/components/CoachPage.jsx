import React from 'react';
import Coach from './modules/coach/Coach';
import NavBar from './modules/layout/NavBar';

const CoachPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <Coach></Coach>
        </div>
    )
}
export default CoachPage;
