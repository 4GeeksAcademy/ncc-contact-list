import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();
    
    useEffect(() => {
        navigate('/contact');
    }, [navigate]);
    return null; 
};