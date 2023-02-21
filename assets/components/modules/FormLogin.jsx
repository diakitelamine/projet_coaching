import React from 'react';

const FormLogin = (props)=>{
    return(
        <div className="card card-register">
            <h1 className="title-register">Connectez-Vous</h1>
            <form>
                <input type="email" name="email" className='form-control' placeholder="Email"  />
                <input type="password" name="password" className='form-control' placeholder="Mot de passe"/>

                <input type="submit" value="Connexion" className="btn btn-send"/>
            </form>
            <p className="btn-connexion"> Pas Inscrit ? <a href="#/register">Inscrivez-Vous</a></p>
        </div>
    )
}
export default FormLogin;