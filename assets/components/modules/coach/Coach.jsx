import React from 'react';
import { API_URL } from '../../../config';
import Loader from '../layout/Loader';
import getUserAuth from '../../fonctions/getUserAuth';
import getPathUserImage from '../../fonctions/getPathUserImage';
class Coachs extends React.Component{
    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            coachs: [],
            DataisLoaded: true,
            image:[],
            postalCode : null
        };
    }

    getCoachs(maxResults){
       
        // Requete à l'api user
        const requestOptions = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                maxResults : maxResults,
                postalCode: this.state.postalCode,
                rayon : null
            }),
        };
        fetch(API_URL+'coachs', requestOptions)
        // Transforme les données en json
        .then((json) => json.json())
        .then((json) => {
            json.map((coach, i) => {
                let path = getPathUserImage(coach.id);
                path.then((value) => {
                    coach.path = value;
                    //Change la valeur des attributs
                    this.setState({
                        coachs: json,
                    })
                    if (i == json.length -1) {
                        this.setState({
                           DataisLoaded: false,
                        })
                    }
                })
                
            })
        });
    }
    
    componentDidMount() {
        let maxResults = null;
        if (this.props.maxResults != undefined) {
            maxResults = this.props.maxResults;
        }
        let auth = getUserAuth();
        auth.then((value) => {
            this.setState({
                postalCode: value.postalCode,
            })
            this.getCoachs(maxResults)
        });
        
    }


    render() {
        const { DataisLoaded, coachs } = this.state;
        return DataisLoaded && !this.props.maxResults ? (
            <Loader></Loader>
        ) :  (
            /*Coachs */
            <div className="coachs">
                {coachs.map((coach) => ( 
                    <div key={coach.id} className="container-coach h-100"  data-id={ coachs.id }>
                        <div className="card card-coach">
                            <img src={coach.path} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title"> { coach.lastname } { coach.firstname }</h5>
                                <p className="card-text">{coach.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Coachs;