import React, { useEffect } from 'react';
import Auth from './Auth';
import { API_URL } from '../../config';
const Profil = () => {
    const [id, setId] = React.useState("");
    const [user, setUser] = React.useState("");
    const [imageProfil, setImageProfil] = React.useState('');
    const [imageCover, setImageCover] = React.useState('');

    useEffect(() => {
        // Requete à l'api user
        fetch(API_URL+'user/'+sessionStorage.getItem("id"))
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            setId(json.id);
            setUser(json)
            let imageProfil = getImageProfilByUser(id);
            imageProfil.then((value) => {
                setImageProfil(value)
            })
            let imageCover = getImageCoverByUser(id);
            imageCover.then((value) => {
                setImageCover(value)
            })
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
        return path;
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
        return path;
    }

    return(
        <div>
            <Auth></Auth>
            <div className='profil'>
                <div className="images">
                    <img src={`./uploads/images/user/${imageCover}`} className="profil-image-cover"/>
                    <img src={`./uploads/images/user/${imageProfil}`} className="profil-image"/>
                    <p className="profil-text"><span className="lastname">{user.lastname}</span> <span className="firstName">{user.firstname}</span></p> 
                </div>
            </div>
        </div>
    )
}

export default Profil;