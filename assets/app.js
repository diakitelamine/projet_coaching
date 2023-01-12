import  ReactDOM  from 'react-dom';
import React from 'react';
import './styles/app.scss';
import './bootstrap';
import NavBar from './components/NavBar';
import FormRegister from './components/pages/FormRegister';
import "bootstrap-icons/font/bootstrap-icons.css";
const $ = require('jquery');
require('bootstrap');

console.log("Hello word!!!")
const App = () =>{
    return <> 
          <NavBar/>
          <FormRegister/>
     </>;
}

// Dans la div app rend moi le contenu de App
const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);