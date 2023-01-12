import React from 'react';

const formRegister = (props)=>{
    return(
        <div className="card card-register">
            <h1 className="title-register">Inscription</h1>
            <form>
                <input type="text" name="firstname" className='form-control' placeholder="Nom"/>
                <input type="text" name="lastname" className='form-control' placeholder="Prénom" />
                <input type="email" name="email" className='form-control' placeholder="Email"  />
                <input type="password" name="password" className='form-control' placeholder="Mot de passe"/>
                <input type="password" name="confoirmPassword" className='form-control' placeholder="Confirmer votre mot de passe" />
                <input type="submit" value="Envoyer" className="btn btn-danger btn-send" />
            </form>
            <p className="btn-connexion"> Vous avez déja un compte ? <a href="#">connectez-vous</a></p>
        </div>
    )
}

export default formRegister;