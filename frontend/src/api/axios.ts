import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true // Required for cookie
});

//axios.create() is a factory method in the Axios library used to create a new, custom instance of the Axios client with its own predefined configuration.