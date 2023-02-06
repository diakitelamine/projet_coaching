import React from 'react';
import Coachs from './modules/Coach';
import Home from './modules/Home';
import NavBar from './modules/NavBar';
const HomePage = (props)=>{ 
    return (
        <div>
            <NavBar name="navbar-home"></NavBar>
            <div id="carouselExampleDark" className="carousel carousel-dark slide"  data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="./uploads/images/image-accueil-yoga.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                        <img src="./uploads/images/image-accueil-boxe.png" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                        <img src="./uploads/images/image-accueil-fitness.png" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
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
