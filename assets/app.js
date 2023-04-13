import  ReactDOM  from 'react-dom';
import React, { useEffect,useState } from 'react';
import './styles/app.scss';
import './bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { HashRouter, Route } from 'react-router-dom';
import Loader from './components/modules/loader';
import HomePage from './components/HomePage';
import CoachsPage from './components/CoachsPage';
import RegisterPage from './components/RegisterPage';
import TestPage from './components/TestPage';
import LoginPage from './components/LoginPage';
const $ = require('jquery');
require('bootstrap');

console.log("Hello word!!!")
const App = () =>{
     const [loader, setLoader] = useState(true);

     useEffect(()=> {
          setTimeout(()=>{
               setLoader(false);
          }, 0 );
     }, []) ;

     return loader ? (
          <div className="light">
               <Loader></Loader>
          </div>
     ) : (
          <div className="light">
               <HashRouter>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/coachs" component={CoachsPage}/>
                    <Route path="/auth" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/test" component={TestPage}/>
               </HashRouter>
          </div>
     );
}

// Dans la div app rend moi le contenu de App
const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
