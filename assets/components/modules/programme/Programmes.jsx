import React, { useEffect } from 'react';
import { API_URL } from '../../../config';
import Loader from '../layout/Loader';
import getPathProgrammeImage from '../../fonctions/getPathProgrammeImage';
import ShowProgramme from './showProgramme';
export default function Programmes(params) {
    const [loader, setLoader] = React.useState(true);
    const [programmes, setProgrammes] = React.useState('');
    
    useEffect(() => {
        let url ='';
        
        console.log(url);
        if(params.myProgramme == 1){
            //Si on affiche les programme du coach connecté
            url = 'programmes/user/'+sessionStorage.getItem("id");
            
        }else{
            //Si non on affiche toutes les recettes
            url = 'programmes';
        }
        console.log(url);
        fetch(API_URL+url)
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
    }, [])

    console.log(programmes);
    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container-fluid programmes">
            {params.myProgramme == 1 &&
                <div>
                    <h1>Vos programmes</h1>
                    <a href="#/new/programme" className="btn btn-primary"><i className="bi bi-plus-lg"></i> Nouveau programme</a>
                </div>
            }
            {params.myProgramme != 1 &&
                <h1>Découvrez de nouveau programme</h1>
            }
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
  