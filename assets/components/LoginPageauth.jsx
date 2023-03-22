import React, {useState} from 'react';
import axios from 'axios';
import FormLogin from './modules/FormLogin';
import NavBar from './modules/NavBar';

const LoginPage = props =>{
    const [credentials, setCredentials] =useState({
        username: "",
        password:""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    }
    
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await axios
                .post("http://127.0.0.1:8000/#/login", credentials)
                .then(response=> console.log(response));
            
        } catch (error) {
            console.log(error.response);
            setError("Informations Incorrectes");
        }

        console.log(credentials);
    };

    return (
        <>
            <h1>Connexion MOC</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse Email</label>
                    <input 
                        value={credentials.username}
                        onChange={handleChange}
                        type="email" 
                        placeholder="Adresse Mail de Connexion" 
                        name="username" 
                        id="username" 
                        className={"form-control" + (error && " is-invalid")} 
                    />
                    {error && <p className="invalid-feedback">{error} </p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de Passe</label>
                    <input 
                        value={credentials.password}
                        onChange={handleChange}
                        type="password" 
                        placeholder="Mot de Passe" 
                        name="password" 
                        id="password" 
                        className="form-control"
                    />
                </div>
                <div className="form-group"><button type="submit" className="btn btn-success">Connexion</button></div>
            </form>
        </>
        // <div>
        //     <NavBar name="navbar-home"></NavBar>
        //     <FormLogin></FormLogin>
        // </div>
    )
}
export default LoginPage;
