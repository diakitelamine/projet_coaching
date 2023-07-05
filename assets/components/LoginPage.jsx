import React from 'react';
import FormLogin from './modules/user/FormLogin';
import NavBar from './modules/layout/NavBar';
import Footer from './modules/layout/Footer';

const LoginPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <FormLogin></FormLogin>
            <Footer></Footer>
        </div>
    )
}
export default LoginPage;
