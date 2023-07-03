import React, { useEffect } from 'react';
import { API_URL } from '../../../config';
import Loader from '../layout/Loader';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ReservationNew = (params) => {
    const {id} = useParams(); //Pour un objet
    const [ready, setReady] = React.useState(0);
    
    useEffect(() => {
        console.log(new Date());
        //Récupererles reservation du coachs
        fetch(API_URL+'reservation/disponible/'+id)
        .then((json) => json.json())
        .then((json) => {
            console.log(json);
        })
    
    }, []);

    const resetForm = () => {
        setName('');
        setDescription('');
        setDuree('');
        setImage('');
        setIngredients([]);
        setCategories([]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Chargement du btn 
        setContentBtn(<span> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Chargement... </span>);
        setDisabledBtn(true);

        const requestOptions = {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser: sessionStorage.getItem("id"),
                categories : categories,
                name : name,
                ingredients:ingredients,
                description: description,
                duree: duree,
                image: image,
                programmes : programmes
            }),
          };

        fetch(API_URL+'new/recette', requestOptions)
            .then(data => data.json())
            .then((data) => {
                
                console.log(data)
                if (data.code == 200) {
                    setMessage({
                        bgColor : 'alert-success',
                        text : data.message,
                        class : ''
                    });
                    resetForm();
                }
                else{
                    setMessage({
                        bgColor : 'alert-danger',
                        text : data.message,
                        class : ''
                    }); 
                }
                setContentBtn(<span><i className="bi bi-check-lg"></i> Ajouter cette recette</span>);
                setDisabledBtn(false);
            }
        )
    }

    return ready != 0 ? (
        <Loader></Loader>
    ) : (
    <div className="container container-reservation">
        <form onSubmit={handleSubmit}>
            <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" checked/>
            <label className="btn btn-outline-success" >Checked success radio</label>

            <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off"/>
            <label className="btn btn-outline-danger" >Danger radio</label>
        </form>
    </div>
    );
}
export default ReservationNew;