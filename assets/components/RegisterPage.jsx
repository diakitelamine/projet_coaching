import React from 'react';
import FormRegister from './modules/user/FormRegister';
import NavBar from './modules/layout/NavBar';
import Footer from './modules/layout/Footer';

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
