import React from 'react';
import { USERS_API } from "../../config";
import Loader from './loader';
class Coachs extends React.Component {
    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            coachs: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        // Requete à l'api user
        fetch('https://127.0.0.1:8000/api/users')
            // Transforme les données en json
            .then((res) => res.json())
            .then((json) => {
                //Change la valeur des attributs
                this.setState({
                    coachs: json["hydra:member"],
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, coachs } = this.state;
        //Si les données ne sont pas encore récupérer
        //Chargement
       /* if (!DataisLoaded) return(
        <div>
            <Loader></Loader>
        </div>
        ) ;*/
        //Affiche les données
        return (
            <div className="mt-5">
                <h2> Coach du moment</h2>  
                <div className="row row-cols-1 row-cols-md-6 g-4">
                    {coachs.map((coach) => ( 
                        <div className="col">
                            <div className="card text-bg-dark h-100"  aria-hidden={DataisLoaded} data-id = { coach.id }>
                            <img src="./uploads/images/image-accueil-boxe.png" className="card-img  min-opacity" alt="..."/>
                                <div className="card-img-overlay">
                                <h5 className="card-title"> { coach.lastname }</h5>
                                <p className="card-text">Biographie.</p>
                                </div>
                            </div>
                    </div>
                    ))}
                </div>
            </div>
    );
    }
}
   
export default Coachs;