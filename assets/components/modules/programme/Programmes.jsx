import React, { useEffect } from 'react';
import { API_URL } from '../../../config';
import Loader from '../layout/Loader';

export default function Programmes(params) {
    const [loader, setLoader] = React.useState(true);
    const [programmes, setProgrammes] = React.useState('');
    
    useEffect(() => {
       /* if(params.myProgramme == 1){
            //Si on affiche les programme du coach connecté
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
        }*/
    }, [])

    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container-fluid programmes">
        
        </div>

        
   )
}
  