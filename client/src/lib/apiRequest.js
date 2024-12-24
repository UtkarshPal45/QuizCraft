import axios from "axios";

const Backend_URL = process.env.BACKEND_URL 
    ? `${process.env.BACKEND_URL}/api` 
    : "http://localhost:8800/api";
    
const apiRequest=axios.create({
    baseURL: Backend_URL,
    withCredentials: true,
})

export default apiRequest;