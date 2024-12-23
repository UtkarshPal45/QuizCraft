import express, {Router} from "express"
import { getQuizzes, getQuizById, createQuiz, submitQuiz, deleteQuiz } from "../controllers/quiz.controller.js";
import authenticateUser from "../middleware/authenticateUser.js"
const quizRouter = Router();

quizRouter.get('/', getQuizzes)
quizRouter.get('/:id', getQuizById)
quizRouter.post('/create',authenticateUser, createQuiz)
quizRouter.post('/submit',authenticateUser, submitQuiz)
quizRouter.delete('/delete/:id',authenticateUser, deleteQuiz)


export default quizRouter