import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/axios";


export default function ProtectedRoute({children} : {children : JSX.Element}){
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        api.get('/api/v1/todo/')
        .then(()=>setAuthorized(true))
        .catch(()=>setAuthorized(false))
        .finally(()=>setLoading(false));
    }, [])


    if(loading) return <div>Loading...</div>
    if(!authorized) return <Navigate to='/signin'/>
    return children;
}
