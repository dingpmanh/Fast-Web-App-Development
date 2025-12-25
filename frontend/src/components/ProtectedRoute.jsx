//This is a wrapper for a protected route.

//It is thefrontend logic that prevents users from accessing certain pages unless they are 
// authenticated (or authorized).

// It does NOT secure the API by itself — it only controls navigation/UI access.

import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

//Children is the thing that is wrapped
//The basic idea is to check if the user is authorized, otherwise redirect to login page
function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        //Refresh the access token using the refresh token
        const refresh = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('/auth/refresh/', { //Make a POST request to the refresh endpoint
                refresh: refreshToken,
            });
            if (token.status === 200) { //200 means request was successful
                localStorage.setItem(ACCESS_TOKEN, res.data.access) //Store the new access token in local storage
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        //Check if the token needs to be refreshed by checking if the access token is expired. 
        //If yes, decode the token to get expiry time.
        // If expried, refresh it. If the refresh token is also expired, redirect to login page.
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return 
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000 // get the date in seconds, instead of milliseconds

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }

    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    } //While checking authorization, show loading

    return isAuthorized ? children : <Navigate to="/login" /> //If not authorized, redirect to login page
}

export default ProtectedRoute