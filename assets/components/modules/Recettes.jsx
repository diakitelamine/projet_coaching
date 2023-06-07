import React, { useEffect } from 'react';
import Auth from './Auth';
import { API_URL } from '../../config';
import Loader from './loader';

export default function Recettes(params) {
    const [loader, setLoader] = React.useState(true);
    const [recettes, setRecettes] = React.useState('');
    
    useEffect(() => {
        if(params.myRecette == 1){
            //Si on affiche les recettes du coach connecté
            fetch(API_URL+'recettes/user/'+sessionStorage.getItem("id"))
            .then((json) => json.json())
            .then((recettes) => {
                console.log(recettes)
                let requests = recettes.map(recette => (
                    getPathImage(recette.id).then((value) => {
                        console.log(value)
                        recette.path = value
                    })
                ))
                Promise.all(requests).then(() => {
                    setRecettes(recettes);
                    setLoader(false);
                })
            })
        }else{
            //Si non on affiche toutes les recettes
        }
    }, [])

    async function getPathImage(id){
        const path = await fetch(API_URL+'image/reccette/'+id)
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            let path = './uploads/images/recette/';
            if (json != null) {
               return path+json.path;   
            }
            else{
                return path+'default.svg'; 
            } 
        });
        console.log(path);
        return path;
    }

    console.log(recettes);
    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container-fluid recettes">
            <h1>Vos recettes</h1>
            <a href="#/new/recette" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Nouvelle recette</a>
            <div className="container-recettes mt-4">
                {recettes != '' &&
                    recettes.map(recette => (  
                        <div className="card">
                            <img src={recette.path} className="card-img-top" alt=""/>
                            <div className="card-body">
                                <h5 className="card-title">{recette.name}</h5>
                                <p className="card-text">{recette.description}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        
   )
}
  