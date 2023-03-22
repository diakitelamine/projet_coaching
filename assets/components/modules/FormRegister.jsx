import React from 'react';

const FormRegister = (props)=>{
    return(
        <div className="card card-register">
            <h1 className="title-register">Inscrivez-Vous</h1>
            <form >
                <input type="text" name="firstname" className='form-control' placeholder="Nom"/>
                <input type="text" name="lastname" className='form-control' placeholder="Prénom" />
                <input type="email" name="email" className='form-control' placeholder="Email"  />
                <input type="password" name="password" className='form-control' placeholder="Mot de passe"/>
                <div className="select-container">
                    <select className="select-option">
                        <option value="coach">Coach</option>
                        <option value="user">Utilisateur</option>
                    </select>
                </div>
                <input type="submit" value="Inscription" className="btn btn-send"/>
            </form>
            <p className="btn-connexion"> Déjà Inscrit ? <a href="#/login">Connectez-Vous</a></p>
        </div>
    )
}
export default FormRegister;