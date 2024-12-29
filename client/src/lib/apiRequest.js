import axios from "axios";

const apiRequest=axios.create({
    baseURL: "https://quizcraft-backend.onrender.com/api",
    withCredentials: true,
})

export default apiRequest;
