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
        let url = '';
        if(params.myRecette == 1){
            //Si on affiche les recettes du coach connecté
            url = 'recettes/user/'+sessionStorage.getItem("id");
        }else{
            //Si non on affiche toutes les recettes
            url = 'recettes';
        }
        fetch(API_URL+url)
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
    }, [])

    console.log(recettes);
    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container-fluid recettes">
            {params.myRecette == 1 && 
            <div>
                <h1>Vos recettes</h1>
                <a href="#/new/recette" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Nouvelle recette</a>
            </div>
            }
            {params.myRecette != 1 && 
                <h1>Découvrez de nouvelle recettes</h1>
            }
            <div className="container-all-recettes mt-4">
                {recettes != '' &&
                    recettes.map(recette => (  
                        <ShowRecette recette={recette}></ShowRecette>
                    ))
                }
            </div>
        </div>

        
   )
}
  