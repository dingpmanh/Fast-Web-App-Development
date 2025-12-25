//Here, we write an interceptor using axios

// An interceptor automatically adds the correct headers to each request, so that we don't have to
// manually add them each time we make a request to the backend.

// Axios is a popular HTTP client library for making requests. It checks if there is an access
// token stored in the local storage of the browser. If there is, it adds the token to request headers.

import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({
    // Here we are creating an object. And,
    // Importing everything that is specified in the .env (environment variables) file
    baseURL: import.meta.env.VITE_API_URL //VITE allows us to put environment variables in JavaScript code
    // Since we are using environment variables, it's easy to load and change the base URL.

    // After creating the environment variable VITE_API_URL in the .env file, we don't have to 
    // specify the baseURL whenever we use const api, we just have specify the path we want to access.
})

api.interceptors.request.use(
    (config) => { //This a function
        const token = localStorage.getItem(ACCESS_TOKEN); //Get the access token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}` //Add the token to the headers Authorization
            // We are using `` to embed the token variable inside the string.
        }
        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default api //export the api object, use it rather than axios directly in the app