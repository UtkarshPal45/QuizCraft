import axios from "axios";

const apiRequest=axios.create({
    baseURL: "https://quiz-craft-api.vercel.app/",
    withCredentials: true,
})

export default apiRequest;
