import React, { useEffect } from 'react';
import { API_URL } from '../../config';
import Loader from './loader';

const RecetteNew = () => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [duree, setDuree] = React.useState("");
    const [ingredients, setIngredients] = React.useState("");
    const [allIngredients, setAllIngredients] = React.useState("");

    const [loader, setLoader] = React.useState(true);
    const [message, setMessage] = React.useState({
        bgColor : '',
        text : '',
        class : 'hidden'
    });
    
    useEffect(() => {
        //Récuperer tout les ingredients
        fetch(API_URL+'ingredients')
        .then((json) => json.json())
        .then((json) => {
            setAllIngredients(json)
            setLoader(false);
        })
    }, []);

    const resetForm = () => {
        
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return loader ? (
        <Loader></Loader>
    ) : (
     <div className="card card-reccette-new">
        <h1 className="title-register">Nouvelle recette</h1>
        <div className={`alert ${message.bgColor} ${message.class}`} role="alert">
            {message.text}
        </div>

        <form onSubmit={handleSubmit}>
            <label className="mt-3"c>Nom*</label>
            <input type="text" name="name" className='form-control'  value={name}  onChange={e => setName(e.target.value)} placeholder="Tartiflette"/>
            
            <label className="mt-3">Ingredient*</label>
            <select name="role" className="form-select" onChange={e => setIngredients(e.target.value)} multiple>
              {allIngredients.map(ingredient => (  
                <option value={ingredient.id}>{ingredient.name}</option>
              ))} 
            </select> 
            
            <label className="mt-3">Déscription*</label>
            <textarea name="description" className='form-control' onChange={e => setDescription(e.target.value)} value={description} ></textarea>
            
            <label className="mt-3">Durée moyenne (en minute)*</label>
            <input type="number" name="duree_moyen" className='form-control' value={duree}  onChange={e => setDuree(e.target.value)} placeholder="20"/>
            

            <button type="submit" value="Envoyer" className="btn btn-success mt-3 mb-3">Ajouter cette recette</button>
        </form>
    </div>
    );
}
export default RecetteNew;