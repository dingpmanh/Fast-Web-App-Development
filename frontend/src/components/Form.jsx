// A form that can be used by login and register pages for user input.

import { useState } from "react";
import api from "../api";
import { useNavigate} from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({route, method}) { // route is the route that we want to submit the form to, 
                                // method is just telling are we registering or are we logging in.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(); // Prevent the default form submission behavior, which is to reload the page.
        
        try{
            const res = await api.post(route, {username, password}) // Send a POST request to the specified route with username and password
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/") // Redirect to home page after successful login
            } else {
                navigate("/login") // Redirect to login page after successful registration
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    } 

    return <form onSubmit = {handleSubmit} className = "form-container">
        <h1>{name}</h1>
        <input 
            className = "form-input"
            type = "text"
            value = {username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            placeholder = "Username" 
        />
        <input 
            className = "form-input"
            type = "password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            placeholder = "Password" 
        />
        {loading && <LoadingIndicator />}
        <button className = "form-button" type = "submit">
            {name}
        </button>
    </form>
}

export default Form