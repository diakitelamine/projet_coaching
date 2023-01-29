import React from 'react';
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
        let maxResults = '';
        if (this.props.maxResults != undefined) {
            maxResults = this.props.maxResults;
        }
        // Requete à l'api user
        fetch('https://127.0.0.1:8000/api/coachs/'+maxResults)
            // Transforme les données en json
            .then((res) => res.json())
            .then((json) => {
                console.log(json, maxResults);
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
            </div>
    );
    }
}
   
export default Coachs;