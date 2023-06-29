import React from 'react';
import FormRegister from './modules/FormRegister';
import NavBar from './modules/NavBar';
import Footer from './modules/Footer';
import { bottom } from '@popperjs/core';

const RegisterPage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            {/* <div className='my-5'> */}
                <FormRegister></FormRegister>

            {/* </div> */}
            <Footer></Footer>
        </div>
    )
}
export default RegisterPage;
