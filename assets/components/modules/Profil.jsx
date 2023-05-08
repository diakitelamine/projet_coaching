import React, { useEffect } from 'react';
import Auth from './Auth';
import { API_URL } from '../../config';
const Profil = () => {
    const [id, setId] = React.useState("");

    useEffect(() => {
        // Requete à l'api user
        fetch(API_URL+'user/'+sessionStorage.getItem("id"))
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            setId(json.id);
            let path = getImageByUser(id);
            path.then((value) => {
                console.log(value);
            })
        });
    }, [])

    async function getImageByUser(id) {
        const path = await fetch(API_URL+'image/user/'+sessionStorage.getItem("id"))
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
            <div className="cover">
                <p>Page profil</p>
            </div>
        </div>
    )
}

export default Profil;