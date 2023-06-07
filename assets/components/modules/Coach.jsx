import React from 'react';
import { API_URL } from '../../config';
import Loader from './loader';
class Coachs extends React.Component{
    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            coachs: [],
            DataisLoaded: true,
            image:[]
        };
    }

    getCoachs(maxResults){
        let auth = this.isAuth();
        auth.then((value) => {
            let user = value;
            
            // Requete à l'api user
            const requestOptions = {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    maxResults : maxResults,
                    postalCode: user.postalCode,
                    rayon : null
                }),
            };
            fetch(API_URL+'coachs', requestOptions)
            // Transforme les données en json
            .then((json) => json.json())
            .then((json) => {
                let requests = json.map((coach) => {
                    let path = this.getPathImageByCoach(coach.id);
                    path.then((value) => {
                        coach.path = value;
                            //Change la valeur des attributs
                        this.setState({
                            coachs: json,
                            DataisLoaded: false,
                        })
                    })
                })
            });
        });
    }

    async isAuth(){
        if (sessionStorage.getItem("id")) {
             // Requete à l'api user
             const user = await fetch(API_URL+'user/'+sessionStorage.getItem("id"))
             // Transforme les données en json
             .then((res) => res.json())
             .then((user) => {
                 //Si l'utilisateur n'existe pas dans la bdd
                 if (!user.id) {
                     //Set la redirection
                     return false;
                 }
                 //Si la session ne correspond pas
                 else if(user.id != sessionStorage.getItem("id") || user.userIdentifier != sessionStorage.getItem("email") || user.password != sessionStorage.getItem("password")){
                    return false;
                 }
                 else{
                    console.log(user);
                    return user;
                 }
             });
             return user;
        }
        else{
            return false;
        }
    }
    
    componentDidMount() {
        let maxResults = null;
        if (this.props.maxResults != undefined) {
            maxResults = this.props.maxResults;
        }
        
        this.getCoachs(maxResults)
        
    }

    async getPathImageByCoach(id){
        const path = await fetch(API_URL+'image/profil/user/'+id)
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
        return (
            /*Coachs */
            <div className="coachs">
                {coachs.map((coach) => ( 
                    <div className="container-coach h-100"  data-id={ coachs.id }>
                        <div className="card card-coach">
                            <img src={`./uploads/images/user/${coach.path}`} className="card-img-top"/>
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