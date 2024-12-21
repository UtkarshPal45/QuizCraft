import express, {Router} from "express"
import { getQuizzes, getQuizById, createQuiz, submitQuiz } from "../controllers/quiz.controller.js";
import authenticateUser from "../middleware/authenticateUser.js"
const quizRouter = Router();

quizRouter.get('/', getQuizzes)
quizRouter.get('/:id', getQuizById)
quizRouter.post('/create',authenticateUser, createQuiz)
quizRouter.put('/submit',authenticateUser, submitQuiz)


export default quizRouter