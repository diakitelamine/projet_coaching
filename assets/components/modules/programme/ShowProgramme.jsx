import React, {useEffect} from "react";
import { Player } from 'video-react';

const ShowProgramme = (props) => {
    console.log(props.programme.path);
    return (
        <div className="card card-programme">
           <Player
            playsInline
            poster=""
            src={props.programme.path}
            />
            <div className="card-body">
                <h5 className="card-title">{props.programme.name}</h5>
                <p className="card-text">{props.programme.description}</p>
                <a href={`#/programme/${props.programme.id}`} className="btn btn-primary">Voir plus</a>
            </div>
        </div>
    )
}
export default ShowProgramme;