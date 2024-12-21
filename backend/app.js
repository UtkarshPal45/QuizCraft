import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDB.js";

const app= express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())


import authRouter from "./routes/auth-route.js"
import quizRouter from "./routes/quiz-route.js"
import userRouter from "./routes/user-route.js"

app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/user', userRouter)


connectDB()
app.listen(8800, ()=>{
    console.log("server started on ports 8800")
})