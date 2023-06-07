import React, { useEffect } from 'react';
import { API_URL } from '../../config';
import Loader from './loader';

const RecetteNew = () => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [duree, setDuree] = React.useState("");
    const [image, setImage] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [allIngredients, setAllIngredients] = React.useState("");
    const [categories, setCategories] = React.useState([]);
    const [allCategories, setAllCategories] = React.useState("");

    const [contentBtn, setContentBtn] = React.useState(<span><i className="bi bi-check-lg"></i> Ajouter cette recette</span>);
    const [disabledBtn, setDisabledBtn] = React.useState(false);
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
        })
        //Recupere tout les catégorie d'ingredient
        fetch(API_URL+'categories/recette')
        .then((json) => json.json())
        .then((json) => {
            setAllCategories(json)
            setLoader(false);
        })

        
    }, []);

    const resetForm = () => {
        
    }


    const handleChangeIngredients = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setIngredients(value);
        
    };

    const handleChangeCategories = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setCategories(value);
        
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        //Transforme l'image en base 64
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            //Remplace l'image de profil
            setImage(reader.result);
        };
        
    };

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
            <img src={image} className="input-image-cover"/>
            <label className='form-label'> Ajouter une image: </label>
            <input name="img-recette" className="form-control" type="file" accept="image/png, image/jpeg" onChange={handleChangeImage}/>

            <label className="mt-3">Categories*</label>
            <select name="role" className="form-select" onChange={handleChangeCategories} multiple>
             {allCategories != '' &&
              allCategories.map(categorie => (  
                <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
              ))
            }
            </select> 

            <label className="mt-3"c>Nom*</label>
            <input type="text" name="name" className='form-control'  value={name}  onChange={e => setName(e.target.value)} placeholder="Tartiflette"/>
            
            <label className="mt-3">Ingredient</label>
            <select name="role" className="form-select" onChange={handleChangeIngredients} multiple>
             {allIngredients != '' &&
              allIngredients.map(ingredient => (  
                <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
              ))
            }
            </select> 
            
            <label className="mt-3">Déscription*</label>
            <textarea name="description" className='form-control' onChange={e => setDescription(e.target.value)} value={description} ></textarea>
            
            <label className="mt-3">Durée moyenne (en minute)*</label>
            <input type="number" name="duree_moyen" className='form-control' value={duree}  onChange={e => setDuree(e.target.value)} placeholder="20"/>
            

            <button type="submit" value="Envoyer"  disabled={disabledBtn} className="btn btn-success mt-3 mb-3">{contentBtn}</button>
        </form>
    </div>
    );
}
export default RecetteNew;