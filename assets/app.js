import  ReactDOM  from 'react-dom';
import React, { useEffect,useState } from 'react';
import './styles/app.scss';
import './bootstrap';
import NavBar from './components/NavBar';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './components/Home';
import FormRegister from './components/pages/FormRegister';
import Coach from './components/pages/Coach';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loader from './components/pages/loader';
import HomePage from './components/pages/HomePage';
const $ = require('jquery');
require('bootstrap');

console.log("Hello word!!!")
const App = () =>{
     const [loader, setLoader] = useState(true);

     useEffect(()=> {
          setTimeout(()=>{
               setLoader(false);
          }, 3000 );
     }, []) ;

     return loader ? (
          <Loader></Loader>
          
     ) : (
          <HashRouter>
               <NavBar></NavBar>
               <Switch>
                    <Route path="/" Component={HomePage}>
                         <Home />
                         <HomePage/>
                         <Coach/>
                    </Route>
                    <Route path="/authentification" Component={FormRegister}>
                         <FormRegister/>
                    </Route>
               </Switch>
          </HashRouter>
     );
}

// Dans la div app rend moi le contenu de App
const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);