import express, {Router} from "express"
import {login, signup, logout} from "../controllers/auth.controller.js"
import authenticateUser from "../middleware/authenticateUser.js"
const authRouter = Router();

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.post('/logout',authenticateUser, logout)

export default authRouter