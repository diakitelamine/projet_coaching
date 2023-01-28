import React from 'react';
import FormRegister from './FormRegister';
class Coachs extends React.Component{
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
        fetch('https://127.0.0.1:8000/api/coachs/'+this.props.maxResults)
            // Transforme les données en json
            .then((res) => res.json())
            .then((json) => {
                console.log(json, this.props.maxResult);
                //Change la valeur des attributs
                this.setState({
                    coachs: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, coachs } = this.state;
        return (
            /*Coachs */
            <div className="p-5">
                <h2> Coach du moment</h2>  
                <div className="row row-cols-1 row-cols-md-6 g-4 coachs">
                    {coachs.map((coach) => ( 
                        
                        <div className="col">
                            <div className="card text-bg-dark h-100"  aria-hidden={DataisLoaded} data-id = { coach.id }>
                            <img src="./uploads/images/image-accueil-boxe.png" className="card-img  min-opacity" alt="..."/>
                                <div className="card-img-overlay">
                                <h5 className="card-title"> { coach.lastname } { coach.firstname }</h5>
                                <p className="card-text"> 
                                {coach.description !== null ? `${coach.description.substring(0, 90)}...` : '' }
                                </p>
                                </div>
                            </div>
                         </div>

                    ))}
                    <div className="col voir-plus-coach">
                        <a href="/coachs">Voir plus <i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </div>
    );
    }
}
   
export default Coachs;