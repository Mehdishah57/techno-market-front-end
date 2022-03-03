import React, { useContext } from 'react';
import { UserContext } from './../global/UserContext';
import { Navigate } from 'react-router-dom';
import Loader from './../components/Loader';
import Decode from "jwt-decode";

const RequireAuth = ({Element, Level}) => {
    const [user] = useContext(UserContext);

    if(!user?._id && localStorage.getItem("fyptoken")) 
    return <div style={{display:'flex',width:'100%',height:'100vh',justifyContent:'center',alignItems:'center'}}>
        <Loader height={150} width={150} />
    </div>

    if(!user?._id || !localStorage.getItem("fyptoken")) return <Navigate to="/login" />
    
    if(Level === 2){
        try{
            const user = Decode(localStorage.getItem("fyptoken"));
            if(!user.verified) return <Navigate to="/verify" />
        }catch(error){
            return <Navigate to="/verify" />
        }
    }

    return <Element />
}

export default RequireAuth;