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

const FormRegister = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [message, setMessage] = React.useState({
        bgColor : '',
        text : '',
        class : 'hidden'
    });

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setRole("")
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`
            Role: ${role}
            Email: ${email}
            Password: ${password}
            Cofirm Password: ${confirmPassword}
            FirstName: ${firstName}
            LastName: ${lastName}
        `);
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newUser : 1,
                email: email,
                roles: [role],
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstName,
                lastName: lastName,
                description : null,
                deletedAt: null,
                deletedBy: null,
                deletedBecause: null,
                createdAt: new Date().toLocaleTimeString()
            }),
          };

        fetch(API_URL+'register/user', requestOptions)
        .then(res => res.json())
        .then((result) => {
            if (result.code == 200){
                setMessage({
                    bgColor : 'alert-success',
                    text : result.message,
                    class : ''
                });
                resetForm();
                console.log(result.message);
            }
            else{
                setMessage({
                    bgColor : 'alert-danger',
                    text : result.message,
                    class : ''
                });
                console.log(result.message);
            }
        })
        .catch(function(err){
            console.log(err);
        })
    }

    return (
     <div className="card card-register">
        <h1 className="title-register">Inscription</h1>
        <div className={`alert ${message.bgColor} ${message.class}`} role="alert">
            {message.text}
        </div>

        <form onSubmit={handleSubmit}>
            <select name="role" className="form-select" onChange={e => setRole(e.target.value)}>
                <option value="">Vous êtes coach ou utilisateur ?</option>
                <option value="ROLE_COACH">Coach</option>
                <option value="ROLE_USER">Utilisateur</option>
            </select>
            <input type="text" name="firstname" className='form-control'  value={firstName}  onChange={e => setFirstName(e.target.value)} placeholder="Nom"/>
            <input type="text" name="lastname" className='form-control' value={lastName}  onChange={e => setLastName(e.target.value)} placeholder="Prénom" />
            <input type="email" name="email" className='form-control'  value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email"  />
            <input type="password" name="password" className='form-control'  value={password}  onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"/>
            <input type="password" name="confirmPassword" className='form-control' value={confirmPassword}  onChange={e => setConfirmPassword(e.target.value)}  placeholder="Confirmer votre mot de passe" />
            <input type="submit" value="Envoyer" className="btn btn-danger btn-send" />
        </form>
        <p className="btn-connexion"> Vous avez déja un compte ? <a href="#/auth">connectez-vous</a></p>
    </div>
    );
}
export default FormRegister;