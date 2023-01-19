import  ReactDOM  from 'react-dom';
import React from 'react';
import './styles/app.scss';
import './bootstrap';
import NavBar from './components/NavBar';
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from './components/HomePage';
import FormRegister from './components/pages/FormRegister';
import Coach from './components/pages/Coach';
import { HashRouter, Route, Switch } from 'react-router-dom';
const $ = require('jquery');
require('bootstrap');

console.log("Hello word!!!")
const App = () =>{
     return <> 
          <HashRouter>
               <NavBar/>
               <HomePage/>
               <Coach></Coach>
               <Switch>
                    <Route path="/test" Component={FormRegister}>
                    </Route>
               </Switch>
          </HashRouter>
     </>;
}

// Dans la div app rend moi le contenu de App
const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);