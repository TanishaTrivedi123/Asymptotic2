import { Navigate } from "react-router-dom";  //Navigate built in component he react-router ka
import { isTokenValid } from "../utils/tokenUtils";

const ProtectedRoute = ({children}) => {
    const valid = isTokenValid();

    if(!valid){
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;