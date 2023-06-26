import React, { useEffect } from 'react';
import Auth from '../Auth';
import { API_URL } from '../../../config';
import Loader from '../layout/Loader';
import getPathRecetteImage from '../../fonctions/getPathRecetteImage';
import ShowRecette from './ShowRecette';

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
                    getPathRecetteImage(recette.id).then((value) => {
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
                        <ShowRecette recette={recette}></ShowRecette>
                    ))
                }
            </div>
        </div>

        
   )
}
  