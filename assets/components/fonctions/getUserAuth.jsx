import React, { useEffect } from 'react';
import { API_URL } from '../../config';

async function getUserAuth(){
    let user =  await fetch(API_URL+'user/'+sessionStorage.getItem("id"))
    // Transforme les données en json
    .then((res) => res.json())
    .then((json) => {
        //Si la session ne correspond pas
        if(json && json.id == sessionStorage.getItem("id") && json.userIdentifier == sessionStorage.getItem("email") && json.password == sessionStorage.getItem("password")){
             return json;
        }
        else{
            return false;
        }
    });

    console.log(user);
    return user;
}

export default getUserAuth;