import React from 'react';
import FormLogin from './modules/FormLogin';
import NavBar from './modules/NavBar';

const LoginPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <FormLogin></FormLogin>
        </div>
    )
}
export default LoginPage;
