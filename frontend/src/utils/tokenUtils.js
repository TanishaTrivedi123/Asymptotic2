// here I am checking in localstorage token is valid or not

import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
    const token = localStorage.getItem("token");

    if(!token){
        return false;
    }

    try{
        const decoded = jwtDecode(token);
        console.log(decoded);

        const currentTime = Date.now() / 1000;

        if(decoded.exp > currentTime){
            return true;   //token valid
        }
        else{
            localStorage.removeItem("token");
            return false;
        }
    }
    catch(error){
        localStorage.removeItem("token");
        return false;
    }
}