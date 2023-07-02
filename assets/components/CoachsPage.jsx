import React, {useState}  from 'react';
import Coachs from './modules/Coach';
import NavBar from './modules/NavBar';

const CoachsPage = (props)=>{ 
    const coachId = props.match.params.id;
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <div className="p-5">
                <Coachs showSearchInput={true}></Coachs>
            </div>
        </div>
    )
}
export default CoachsPage;
