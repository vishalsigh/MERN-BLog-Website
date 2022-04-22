import axios from "axios";
import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LogOut() {
    const {getLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();
    async function logout() {
        await axios.get('http://localhost:5000/logout');
        await getLoggedIn();
        navigate('/');
    }
    return <button onClick={logout}>Log Out</button>
}

export default LogOut;