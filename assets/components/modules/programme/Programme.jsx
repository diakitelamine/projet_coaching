import React, {useEffect} from "react";
import { API_URL } from "../../../config";
import Loader from "../layout/Loader";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import getPathProgrammeImage from "../../fonctions/getPathProgrammeImage";
import { Player } from "video-react";

export default function Programme(params){
    const [programme, setProgramme] = React.useState('');
    const [coach, setCoach] = React.useState();
    const [ready, setReady] = React.useState(0);
    const [avis, setAvis]= React.useState([1,2,3,4,5]);
    const {id} = useParams(); //Pour un objet

    useEffect(() => {
        //let get = useParams();
        
        //Si un id à été identifié
        if (id) {
            let num = 0;
            //Récupère la recette
            fetch(API_URL+'programmes/'+id)
            .then((json) => json.json())
            .then((programme) => {
                console.log(programme);
                //Recupere l'image de la recette
                getPathProgrammeImage(programme.id).then((value) => {
                    programme.path = value
                    setProgramme(programme);
                    num += 1;
                    setReady(num)
                })
            })
        }
    }, [])

   /* async function getIngredients(id){
        const ingredients = await fetch(API_URL+'ingredients/recette/'+id)
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            return json; 
        });
        return ingredients;
    }*/

    /*async function getProgrammes(id){
        const programmes = await fetch(API_URL+'programmes/recette/'+id)
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            return json; 
        });
        return programmes;
    }*/

    async function getCoach(url){
        var url = url.replace("/api/", "");
        const coach = await fetch(API_URL+url)
        // Transforme les données en json
        .then((res) => res.json())
        .then((json) => {
            return json; 
        });
        return coach;
    }
    
    console.log(ready);
    return ready != 1 ? (
        <Loader></Loader>
   ) : (
        <div className="container-programme">
            <div className="bandeau">
                <h1>{programme.name}</h1>
                <div className="avis"> 
                    {avis.map(avi => (
                        <i key={avi} className="bi bi-star-fill"> </i>  
                    ))}
                </div>
                <div className="container-media">
                    {programme.path.substring(programme.path.length -4) == '.mp4' &&
                        <Player playsInline className="programme-media"  poster="" src={programme.path} />
                    }
                    {programme.path.substring(programme.path.length -4) != '.mp4' &&
                        <img src={programme.path} className="programme-media" alt=""/>
                    }

                </div>
            </div>
        </div>
   )
}