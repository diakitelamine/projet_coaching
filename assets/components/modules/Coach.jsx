import React from 'react';
import { API_URL } from '../../config';
class Coachs extends React.Component{
    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            coachs: [],
            DataisLoaded: false,
            image:[]
        };
    }

    componentDidMount() {
        console.log(API_URL);
        let maxResults = '';
        if (this.props.maxResults != undefined) {
            maxResults = this.props.maxResults;
        }
        // Requete à l'api user
        fetch(API_URL+'coachs/'+maxResults)
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            json.map((coach) => {
                let path = this.getPathImageByCoach(coach.id);
                path.then((value) => {
                    coach.path = value;
                    //Change la valeur des attributs
                    this.setState({
                        coachs: json,
                        DataisLoaded: true,
                    })
                })
                
            })
           
           
        });
    }

    async getPathImageByCoach(id){
        const path = await fetch(API_URL+'image/user/'+id)
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            if (json != null) {
               return json.path;   
            }
            else{
                return 'default.svg'; 
            } 
        });
        return path;
    }

    render() {
        const { DataisLoaded, coachs } = this.state;
        return(
            /*Coachs */
            <div className="row row-cols-1 row-cols-md-6 g-4 coachs">
                {coachs.map((coach) => ( 
                    <div className="col" key={coach.id} >
                        <div className="card h-100"  data-id={ coachs.id }>
                            <div className="card card-coach">
                                <img src={`./uploads/images/user/${coach.path}`} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title"> { coach.lastname } { coach.firstname }</h5>
                                    <p className="card-text">{coach.description !== null ? `${coach.description.substring(0, 250)}...` : '' }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Coachs;