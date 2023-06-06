import React, { useEffect } from 'react';
import Auth from './Auth';
import { API_URL } from '../../config';
import Loader from './loader';

export default function RecettesProfil() {
    const [loader, setLoader] = React.useState(true);
    const [recettes, setRecettes] = React.useState('');
    
    useEffect(() => {
        setLoader(false);
    }, [])

    
    return loader ? (
        <Loader></Loader>
   ) : (
        <div className="container-fluid profil-reccettes">
            <h1>Vos recettes</h1>
            <a href="#/new/recette" className="btn btn-primary">Nouvelle recette</a>
        </div>
   )
}
  