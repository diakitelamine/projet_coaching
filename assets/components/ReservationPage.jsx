import React from 'react';
import FormRegister from './modules/user/FormRegister';
import NavBar from './modules/layout/NavBar';
import Auth from './modules/Auth';
import ReservationNew from './modules/reservation/ReservationNew';

const RegisterPage = (props)=>{ 
    return (
        <div>
            <Auth></Auth>
            <NavBar name="navbar-home"></NavBar>
            <ReservationNew></ReservationNew>
        </div>
    )
}
export default RegisterPage;
