import React from 'react';

const NavBar = (props)=>{
    return(
      <nav className={`navbar navbar-expand-lg ${props.name}`} >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MOC</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#/">Accueil
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/coachs/">Coachs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">About</a>
            </li>
          </ul>
          <ul className="navbar-nav me-auto navbar-right">
            <li className="nav-item">
                <a className="nav-link" href="#/auth" >Authentification</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )


}

export default NavBar;