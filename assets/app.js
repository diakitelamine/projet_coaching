import  ReactDOM  from 'react-dom';
import React from 'react';
import './styles/app.scss';
import './bootstrap';
import NavBar from './components/NavBar';
const $ = require('jquery');
require('bootstrap');

console.log("Hello word!!!")
const App = () =>{
    return <> 
          <NavBar/>
     </>;
}

// Dans la div app rend moi le contenu de App
const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);