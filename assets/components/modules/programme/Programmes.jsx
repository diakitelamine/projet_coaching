import React, { useEffect } from 'react';
import { API_URL } from '../../../config';
import Loader from '../layout/Loader';
import getPathProgrammeImage from '../../fonctions/getPathProgrammeImage';
import ShowProgramme from './showProgramme';
export default function Programmes(params) {
    const [loader, setLoader] = React.useState(true);
    const [programmes, setProgrammes] = React.useState('');
    
    useEffect(() => {
        if(params.myProgramme == 1){
            //Si on affiche les programme du coach connecté
            fetch(API_URL+'programmes/user/'+sessionStorage.getItem("id"))
            .then((json) => json.json())
            .then((programmes) => {
                console.log(programmes);
                let requests = programmes.map(programme => (
                    getPathProgrammeImage(programme.id).then((value) => {
                        console.log(value)
                        programme.path = value
                    })
                ))
                Promise.all(requests).then(() => {
                    setProgrammes(programmes);
                    setLoader(false);
                })
            })
        }else{
            //Si non on affiche toutes les recettes
        }
    }, [])

    console.log(programmes);
    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container-fluid programmes">
            <h1>Vos programmes</h1>
            <a href="#/new/programme" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Nouveau programme</a>
            <div className="container-all-programmes mt-4">
                {programmes != '' &&
                    programmes.map(programme => (  
                        <ShowProgramme programme={programme}></ShowProgramme>
                    ))
                }
            </div>
        </div>

        
   )
}
  