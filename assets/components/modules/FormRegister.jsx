import React from 'react';

const FormRegister = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`
            Email: ${email}
            Password: ${password}
            FirstName: ${firstName}
            LastName: ${lastName}
        `);
        const requestOptions = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                roles: [
                    "ROLE_USER"
                ],
                password: password,
                firstname: firstName,
                lastname: lastName,
                description : null,
                deletedAt: null,
                deletedBy: null,
                deletedBecause: null,
                createdAt: new Date().toLocaleTimeString()
            }),
          };

        fetch('https://127.0.0.1:8000/api/users', requestOptions)
            .then(async response => {
                console.log(response.json());
                console.log(requestOptions);
            })
            .then((data) => {
                 console.log(data);
            }
        )
    }
  
    return (
     <div className="card card-register">
        <h1 className="title-register">Inscription</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" className='form-control'  value={firstName}  onChange={e => setFirstName(e.target.value)} placeholder="Nom"/>
            <input type="text" name="lastname" className='form-control' value={lastName}  onChange={e => setLastName(e.target.value)} placeholder="Prénom" />
            <input type="email" name="email" className='form-control'  value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email"  />
            <input type="password" name="password" className='form-control'  value={password}  onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"/>
            <input type="password" name="confoirmPassword" className='form-control' placeholder="Confirmer votre mot de passe" />
            <input type="submit" value="Envoyer" className="btn btn-danger btn-send" />
        </form>
        <p className="btn-connexion"> Vous avez déja un compte ? <a href="#">connectez-vous</a></p>
    </div>
    );
}
export default FormRegister;