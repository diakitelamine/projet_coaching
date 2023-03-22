import React from 'react';
import { API_URL } from '../../config';

const FormLogin = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState({
        bgColor : '',
        text : '',
        class : 'hidden'
    });

    const createSession = (user) => {
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("role", JSON.stringify(user.roles));
        sessionStorage.setItem("firstName", user.firstname);
        sessionStorage.setItem("lastName", user.lastname);
        sessionStorage.setItem("id", user.id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`
            Email: ${email}
            Password: ${password}
        `);
        const requestOptions = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                auth : 1,
                email: email,
                password: password,
            }),
          };

        fetch(API_URL+'auth/user', requestOptions)
        .then(res => res.json())
        .then((result) => {
            if (result.code == 200){
                setMessage({
                    bgColor : '',
                    text : '',
                    class : 'hidden'
                });
                //Creer une session
                createSession(result.user);
                //Redirection
                document.location.href="#/profil";
            }
            else{
                setMessage({
                    bgColor : 'alert-danger',
                    text : result.message,
                    class : ''
                });
            }

            console.log(result);
        })
        .catch(function(err){
            console.log(err);
        })      
    }
  
    return (
     <div className="card card-register">
        <h1 className="title-register">Connexion</h1>
        <div className={`alert ${message.bgColor} ${message.class}`} role="alert">
            {message.text}
        </div>
        <form onSubmit={handleSubmit}>
           <input type="email" name="email" className='form-control'  value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email"  />
            <input type="password" name="password" className='form-control'  value={password}  onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"/>
            <input type="submit" value="Envoyer" className="btn btn-danger btn-send" />
        </form>
        <p className="btn-connexion"> Vous avez déja un compte ? <a href="#/register">inscrivez-vous</a></p>
    </div>
    );
}
export default FormLogin;