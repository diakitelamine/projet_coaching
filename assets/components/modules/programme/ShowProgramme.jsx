import React, {useEffect} from "react";
import { Player } from 'video-react';

const ShowProgramme = (props) => {
    //console.log(props.programme.path.substring(props.programme.path.length -4));
    return (
        <div key={props.programme.id} className="card card-programme-coach">
            {props.programme.path.substring(props.programme.path.length -4) == '.mp4' &&
                <Player playsInline  poster="" src={props.programme.path} />
            }
            {props.programme.path.substring(props.programme.path.length -4) != '.mp4' &&
                <img src={props.programme.path} className="card-img-top" alt=""/>
            }
            <div className="card-body">
                <h5 className="card-title">{props.programme.name}</h5>
                <p className="card-text">{props.programme.description}</p>
                <a href={`#/programme/${props.programme.id}`} className="btn btn-primary">Voir plus</a>
            </div>
        </div>
    )
}
export default ShowProgramme;