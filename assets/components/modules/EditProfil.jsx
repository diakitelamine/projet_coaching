import React, { useEffect } from 'react';
import Auth from './Auth';
import { API_URL } from '../../config';
import Loader from './loader';

export default function EditProfil() {
    const [email, setEmail] = React.useState("");
    const [address, setaddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [postalCode, setPostalCode] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [loader, setLoader] = React.useState(true);
    
    const [imageProfil, setImageProfil] = React.useState('');
    const [imageCover, setImageCover] = React.useState('');
    
    useEffect(() => {
        // Requete à l'api user
        fetch(API_URL+'user/'+sessionStorage.getItem("id"))
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            setEmail(json.email);
            setaddress(json.address);
            setCity(json.city);
            setPostalCode(json.postalCode);
            setFirstName(json.firstname);
            setLastName(json.lastname);
            setDescription(json.description);
            let imageProfil = getImageProfilByUser(sessionStorage.getItem("id"));
            imageProfil.then((value) => {
                setImageProfil(value)
            })
            let imageCover = getImageCoverByUser(sessionStorage.getItem("id"));
            imageCover.then((value) => {
                setImageCover(value)
            })
            setLoader(false);
        });
    }, [])

    async function getImageProfilByUser(id) {
        const path = await fetch(API_URL+'image/profil/user/'+sessionStorage.getItem("id"))
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            if (json != null) {
               return json.path;   
            }
            else{
                return 'default.svg'; 
            } 
        });
        return './uploads/images/user/'+path;
    }

    async function getImageCoverByUser(id) {
        const path = await fetch(API_URL+'image/cover/user/'+sessionStorage.getItem("id"))
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            if (json != null) {
               return json.path;   
            }
            else{
                return 'default.svg'; 
            } 
        });
        return './uploads/images/user/'+path;
    }

    const handleChangeImageCover = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        //Transforme l'image en base 64
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            //Remplace l'image de couverture
            setImageCover(reader.result);
        };
    };

    const handleChangeImageProfil = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        //Transforme l'image en base 64
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            //Remplace l'image de profil
            setImageProfil(reader.result);
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: sessionStorage.getItem("id"),
                imageProfil: imageProfil,
                imageCover: imageCover,
                email: email,
                address : address,
                city: city,
                postalCode: postalCode,
                firstname: firstName,
                lastname: lastName,
                description : description
            }),
          };

        fetch(API_URL+'edit/user', requestOptions)
            .then(async response => {
                console.log(response.json());
            })
            .then((data) => {
                 console.log(data);
            }
        )
    }
    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container edit-profil">
            <form className="card" onSubmit={handleSubmit}>
                <h4>Modifier votre profil <i className="bi bi-pen"></i></h4>
                <div className="row mb-4">
                    <div className="col">
                        <img src={`${imageCover}`} className="input-image-cover"/>
                        <label className='form-label'> Changer l'image de couverture: </label>
                        <input name="img-cover" className="form-control" type="file" accept="image/png, image/jpeg" onChange={handleChangeImageCover}/>
                    </div>
                    <div className="col">
                        <img src={`${imageProfil}`} className="input-profil-image"/>
                        <label className='form-label'> Changer l'image de profil: </label>
                        <input name="img-profil" className="form-control" type="file" accept="image/png, image/jpeg" onChange={handleChangeImageProfil} />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col">
                        <label className='form-label'> Nom: </label>
                        <input name="lastName" type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label className='form-label' > Prénom: </label>
                        <input name="firstName" type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col">
                        <label className='form-label'> Email: </label>
                        <input name="email" type="email"   className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label className='form-label'> Adresse: </label>
                        <input name="address" type="text" className="form-control" value={address} onChange={e => setaddress(e.target.value)} required />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col">
                        <label className='form-label' > Code Postal: </label>
                        <input name="postalCode" type="text" className="form-control" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label className='form-label'> Ville: </label>
                        <input name="city" type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} required />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col">
                        <label className='form-label' > Déscription: </label>
                        <textarea name="description" type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                    </div>
                </div>
                <button className="btn btn-success">Enregistrer</button>
            </form>
        </div>
    );
  }
  