import React from 'react';

const Home = (props)=>{ 
    return (
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
    )
}
export default Home;
