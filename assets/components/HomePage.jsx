import React from 'react';
import Coachs from './modules/Coach';
import Home from './modules/Home';
import NavBar from './modules/NavBar';
const HomePage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <div className="image-home animate__animated animate__fadeInUp">
                <div>MY ONLINE COACH</div>
                <img src="./uploads/images/image-accueil-boxe.png" className="img-fluid" alt="Home Image"/>
            </div>
            
            
            <Home></Home>
            <div className="p-5">
                <div className="row row-cols-1 row-cols-md-2 ">
                    <div className="col">
                        <h2 > Coach du moment</h2> 
                    </div>   
                    <div className="col">
                        <a href="#/coachs" className="voir-plus-coach">Voir plus <i className="bi bi-arrow-right"></i></a> 
                    </div>
                </div>
                <Coachs maxResults="6"></Coachs>
            </div>
        </div>
    )
}
export default HomePage;
