import express, {Router} from "express"
import {getUserProfile, updateUserProfile} from "../controllers/user.controller.js"
import authenticateUser from "../middleware/authenticateUser.js"

const userRouter = Router();

userRouter.get('/profile',authenticateUser, getUserProfile)
userRouter.put('/profile/update',authenticateUser, updateUserProfile)


export default userRouter