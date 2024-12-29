import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDB.js";

const app= express();


app.use(cors({
    origin: ["https://quiz-craft-client-dun.vercel.app"], // Frontend's URL
    credentials: true,              // Allow cookies and credentials
  }))
app.use(express.json())
app.use(cookieParser())


import authRouter from "./routes/auth-route.js"
import quizRouter from "./routes/quiz-route.js"
import userRouter from "./routes/user-route.js"

app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 8800;
connectDB()
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})
