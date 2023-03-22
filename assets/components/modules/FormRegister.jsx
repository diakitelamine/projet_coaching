import React from 'react';
import { renderForm, Form, FormRow } from 'react-symfony-form';
import {login} from "../../../src/Controller/SecurityController.php"
import {register} from "../../../src/Controller/RegistrationController.php"

class FormRegister extends React.Component
{
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword:''

        };
    }

    componentDidMount() {
        fetch('https://localhost:8000/api/users')
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            // (error) => {
            //   this.setState({
            //     isLoaded: true,
            //     error
            //   });
            // Okii je vais voir ca marche merci du coup pour l'authentification j'utilise la methode csrf }

          )
    }



    render() {
        const handleChange = (event)=>{
            const value = event.currentTarget.value;
            const name = event.currentTarget.name;
        }

        function onSubmit (){
            //ICI Mettre API création du nouvel utilisateur
            register(this.state)
            .then(
                //connexion + redirection
            )
//Je viens de voir l'heure je dois bouger, je vais regarder les docs symfony/react, et demain incha Allah on reprend ca marche sista pas de sousic merci beaucoup on voit c demain In Sha Allah bv vasyyyy
//Là j'ai pas envie de te faire nimporte quoi mdr



        }

        return (
            //Ca va etre un peu plus complexe mais en gros tu vas devoir utiliser React redux pour sauvegarder les données
            // de la personne connectée et comme ça tu pourras l'utiliser sur toute l'appli ok ca veut dire que je dois regarder comment fonctionne redux pour matcher

            <form >
                <label htmlFor="fullname">lastname</label>
                <input type="text" name='fullname' onChange={handleChange} id="fullname" placeholder="Fullname" />

                <label htmlFor="email">firstname</label>
                <input type="text" name='firstname' id="firstname" placeholder="Email" onChange={e=>this.state.firstname(e)}/>

                <label htmlFor="email">Email</label>
                <input type="email" name='email' id="email" placeholder="Email" onChange={e=>this.state.email(e)} />

                <label htmlFor="password">Password</label>
                <input type="password" name='password' id="password" placeholder="Password" onChange={e=>this.state.password(e)} />

                <button type="submit" onClick={onSubmit}>Sign up</button>
                <span className='text-success'>{this.state.successMessage}</span>
            </form>
        );
    }
}
export default FormRegister;