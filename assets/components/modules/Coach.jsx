import React from 'react';
import { API_URL } from '../../config';

class Coachs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            coachs: [],
            DataisLoaded: false,
            image:[],
            searchInput: ''
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchInput: event.target.value });
    };

    componentDidMount() {
        const { maxResults = '' } = this.props;
    
        fetch(API_URL+'coachs/'+maxResults)
            .then((res) => res.json())
            .then((json) => {
                json.map((coach) => {
                    // ...
                });
    
                this.setState({
                    coachs: json,
                    DataisLoaded: true
                });
            });
    }

    async getPathImageByCoach(id){
        const path = await fetch(API_URL+'image/profil/user/'+id)
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
    
    // redirectToProfile(coachId) {
    //     //Redirection vers la page du profil du coach en utilisant son id
    //     window.location.assign(`#/profile/${coachId}`);
    // }

    render() {
        const { DataisLoaded, coachs, searchInput } = this.state;
        const { showSearchInput } = this.props; // Ajout de la variable de contrôle

        const filteredCoachs = coachs.filter(coach => coach.description && coach.description.toLowerCase().includes(searchInput.toLowerCase()));
    
        return(
            <div>
                {/* Condition pour afficher la barre de recherche */}
                {showSearchInput && (
                    <input type="text" value={searchInput} onChange={this.handleSearchChange} placeholder="Rechercher un coach" />
                )}
    
                <div className="row row-cols-1 row-cols-md-6 g-4 coachs">
                    {filteredCoachs.map((coach) => (
                        <div className="col" key={coach.id} >
                            <div className="card h-100"  data-id={ coachs.id }>
                                <div className="card card-coach" onClick={() => this.redirectToProfile(coach.id)}>
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
            </div>
        );
    }   
}

export default Coachs;
